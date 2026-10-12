"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { LEAD_ENDPOINT } from "@/config/app";
import { ALL_CATEGORIES } from "@/content/loyalty";
import { Icon } from "./Icon";

/**
 * "Join as merchant" lead form (context §6.5).
 * - No GSTIN or bank details here (those belong to formal onboarding).
 * - Posts JSON to NEXT_PUBLIC_LEAD_ENDPOINT. Nothing is stored in the front end.
 * TODO(lead-dev): build the backend for the endpoint (validation, spam checks, storage, notification).
 */

type Values = {
  businessName: string;
  name: string;
  mobile: string;
  email: string;
  category: string;
  locality: string;
  city: string;
  message: string;
  consent: boolean;
  website: string; // honeypot, must stay empty
};

type Errors = Partial<Record<keyof Values, string>>;

const INITIAL: Values = {
  businessName: "",
  name: "",
  mobile: "",
  email: "",
  category: "",
  locality: "",
  city: "",
  message: "",
  consent: false,
  website: "",
};

function validate(v: Values): Errors {
  const e: Errors = {};
  if (!v.businessName.trim()) e.businessName = "Enter your business name.";
  if (!v.name.trim()) e.name = "Enter your name.";
  const digits = v.mobile.replace(/\D/g, "").replace(/^91(?=\d{10}$)/, "");
  if (!/^[6-9]\d{9}$/.test(digits)) e.mobile = "Enter a valid 10-digit Indian mobile number.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = "Enter a valid email address.";
  if (!v.category) e.category = "Choose a business category.";
  if (!v.locality.trim()) e.locality = "Enter your locality or area.";
  if (!v.city.trim()) e.city = "Enter your city.";
  if (!v.consent) e.consent = "Please agree so we can contact you.";
  return e;
}

export function LeadForm() {
  const [values, setValues] = useState<Values>(INITIAL);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Values, boolean>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error" | "unconfigured">("idle");

  const set = <K extends keyof Values>(k: K, val: Values[K]) => {
    const next = { ...values, [k]: val };
    setValues(next);
    if (touched[k]) setErrors(validate(next));
  };
  const blur = (k: keyof Values) => {
    setTouched((t) => ({ ...t, [k]: true }));
    setErrors(validate(values));
  };

  async function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    setTouched(Object.fromEntries(Object.keys(INITIAL).map((k) => [k, true])));
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0];
      document.getElementById(`lead-${first}`)?.focus();
      return;
    }
    // Honeypot: bots fill hidden fields. Pretend success, send nothing.
    if (values.website) {
      setStatus("success");
      return;
    }

    const payload = {
      businessName: values.businessName.trim(),
      name: values.name.trim(),
      mobile: `+91${values.mobile.replace(/\D/g, "").slice(-10)}`,
      email: values.email.trim(),
      category: values.category,
      locality: values.locality.trim(),
      city: values.city.trim(),
      message: values.message.trim(),
      consent: true,
      submittedAt: new Date().toISOString(),
      source: "website:/merchants/join",
    };

    setStatus("sending");
    if (!LEAD_ENDPOINT) {
      if (process.env.NODE_ENV !== "production") {
        // Dev-only stub: logs locally, stores nothing.
        console.info("[LeadForm] DEV STUB, no endpoint configured. Payload:", payload);
        await new Promise((r) => setTimeout(r, 600));
        setStatus("success");
      } else {
        setStatus("unconfigured");
      }
      return;
    }
    try {
      const res = await fetch(LEAD_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") return <SuccessCard name={values.name.trim().split(" ")[0]} />;

  const err = (k: keyof Values) => (touched[k] ? errors[k] : undefined);

  return (
    <form onSubmit={onSubmit} noValidate className="card p-6 md:p-8" aria-describedby="lead-required-note">
      <p id="lead-required-note" className="mb-6 text-body-sm text-muted">
        Fields marked <span aria-hidden className="text-primary">*</span>
        <span className="sr-only">with an asterisk</span> are required.
      </p>
      <div className="grid gap-5 md:grid-cols-2">
        <Field id="businessName" label="Business name" required error={err("businessName")}>
          <input id="lead-businessName" autoComplete="organization" value={values.businessName} onChange={(e) => set("businessName", e.target.value)} onBlur={() => blur("businessName")} {...aria("businessName", err("businessName"))} className={inputCls(err("businessName"))} />
        </Field>
        <Field id="name" label="Your name" required error={err("name")}>
          <input id="lead-name" autoComplete="name" value={values.name} onChange={(e) => set("name", e.target.value)} onBlur={() => blur("name")} {...aria("name", err("name"))} className={inputCls(err("name"))} />
        </Field>
        <Field id="mobile" label="Mobile number" required error={err("mobile")}>
          <div className={`flex items-stretch overflow-hidden ${inputCls(err("mobile"), true)}`}>
            <span className="flex items-center border-r border-outline bg-tag px-3 text-label-md text-navy">+91</span>
            <input id="lead-mobile" type="tel" inputMode="numeric" autoComplete="tel-national" maxLength={14} value={values.mobile} onChange={(e) => set("mobile", e.target.value)} onBlur={() => blur("mobile")} {...aria("mobile", err("mobile"))} className="min-w-0 flex-1 bg-transparent px-3.5 outline-none" />
          </div>
        </Field>
        <Field id="email" label="Email" required error={err("email")}>
          <input id="lead-email" type="email" autoComplete="email" value={values.email} onChange={(e) => set("email", e.target.value)} onBlur={() => blur("email")} {...aria("email", err("email"))} className={inputCls(err("email"))} />
        </Field>
        <Field id="category" label="Business category" required error={err("category")}>
          <div className="relative">
            <select id="lead-category" value={values.category} onChange={(e) => set("category", e.target.value)} onBlur={() => blur("category")} {...aria("category", err("category"))} className={`${inputCls(err("category"))} appearance-none pr-10`}>
              <option value="">Select a category</option>
              {ALL_CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <Icon name="chevronDown" size={18} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-muted" />
          </div>
        </Field>
        <Field id="locality" label="Locality / area" required error={err("locality")}>
          <input id="lead-locality" autoComplete="address-level3" placeholder="e.g. your area" value={values.locality} onChange={(e) => set("locality", e.target.value)} onBlur={() => blur("locality")} {...aria("locality", err("locality"))} className={inputCls(err("locality"))} />
        </Field>
        <Field id="city" label="City" required error={err("city")}>
          <input id="lead-city" autoComplete="address-level2" value={values.city} onChange={(e) => set("city", e.target.value)} onBlur={() => blur("city")} {...aria("city", err("city"))} className={inputCls(err("city"))} />
        </Field>
        <div className="md:col-span-2">
          <Field id="message" label="Anything else?" error={undefined}>
            <textarea id="lead-message" rows={4} value={values.message} onChange={(e) => set("message", e.target.value)} className={`${inputCls()} h-auto py-3`} />
          </Field>
        </div>
      </div>

      {/* Honeypot: hidden from people and assistive tech */}
      <div aria-hidden="true" data-audit-ignore className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="lead-website">Website</label>
        <input id="lead-website" tabIndex={-1} autoComplete="off" value={values.website} onChange={(e) => set("website", e.target.value)} />
      </div>

      <div className="mt-6">
        <label htmlFor="lead-consent" className="flex cursor-pointer items-start gap-3">
          <input
            id="lead-consent"
            type="checkbox"
            checked={values.consent}
            onChange={(e) => {
              set("consent", e.target.checked);
              setTouched((t) => ({ ...t, consent: true }));
            }}
            {...aria("consent", err("consent"))}
            className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer accent-primary"
          />
          <span className="text-body-md text-navy">
            I agree to Asraubh Private Limited contacting me about Puraskrit and processing these details as described in the{" "}
            <Link href="/legal/merchant-privacy/" className="text-primary underline underline-offset-2">
              Merchant Privacy Policy
            </Link>
            . <span aria-hidden className="text-primary">*</span>
          </span>
        </label>
        <ErrorText id="consent" error={err("consent")} />
      </div>

      <AnimatePresence>
        {(status === "error" || status === "unconfigured") && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            role="alert"
            className="mt-5 rounded-xl border border-error/30 bg-error/5 px-4 py-3 text-body-md text-error"
          >
            {status === "unconfigured"
              ? "This form isn't connected yet. Please email support@puraskrit.com."
              : "Something went wrong sending your details. Please try again, or email support@puraskrit.com."}
          </motion.p>
        )}
      </AnimatePresence>

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-7 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-8 text-label-lg text-on-primary shadow-[0_8px_24px_rgba(37,99,235,0.28)] transition hover:-translate-y-0.5 active:scale-[0.98] active:bg-on-primary-container disabled:opacity-70 md:w-auto"
      >
        {status === "sending" ? "Sending…" : "Send"}
        {status !== "sending" && <Icon name="arrowRight" size={18} />}
      </button>
    </form>
  );
}

const aria = (k: string, error?: string) => ({
  "aria-invalid": error ? true : undefined,
  "aria-describedby": error ? `lead-${k}-error` : undefined,
  "aria-required": true,
});

function inputCls(error?: string, wrapper = false) {
  return `${wrapper ? "" : "w-full px-3.5"} h-12 rounded-[12px] border bg-card text-body-lg text-navy transition focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/15 outline-none ${
    error ? "border-error" : "border-outline-variant"
  }`;
}

function Field({ id, label, required, error, children }: { id: string; label: string; required?: boolean; error?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={`lead-${id}`} className="mb-1.5 block text-label-md text-navy">
        {label}
        {required && <span aria-hidden className="ml-0.5 text-primary">*</span>}
      </label>
      {children}
      <ErrorText id={id} error={error} />
    </div>
  );
}

function ErrorText({ id, error }: { id: string; error?: string }) {
  return (
    <p id={`lead-${id}-error`} className={`mt-1.5 text-body-sm text-error ${error ? "" : "hidden"}`} aria-live="polite">
      {error}
    </p>
  );
}

/** Animated confirmation: ring pulse, drawn tick, sparkles (palette only), then the message. */
function SuccessCard({ name }: { name: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // Bring the confirmation into view (the form above it was taller).
    ref.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
  }, [reduce]);
  const d = (n: number) => (reduce ? 0 : n);
  return (
    <motion.div
      ref={ref}
      role="status"
      aria-live="polite"
      initial={{ opacity: 0, y: reduce ? 0 : 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: d(0.5), ease: [0.22, 1, 0.36, 1] }}
      className="card relative flex flex-col items-center px-6 py-12 text-center md:px-10"
    >
      <div className="relative flex h-28 w-28 items-center justify-center">
        {[0, 1].map((r) => (
          <motion.span
            key={r}
            aria-hidden
            className="absolute inset-0 rounded-full border-2 border-primary/30"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1.5, opacity: [0, 0.7, 0] }}
            transition={{ duration: d(1.4), delay: d(0.2 + r * 0.35), ease: "easeOut" }}
          />
        ))}
        <motion.span
          className="relative flex h-20 w-20 items-center justify-center rounded-full bg-primary text-on-primary shadow-[0_14px_34px_rgba(37,99,235,0.35)]"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: d(0.5), ease: [0.22, 1, 0.36, 1] }}
        >
          <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <motion.path
              d="m5 12.5 4.5 4.5L19 7.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: d(0.5), delay: d(0.35), ease: "easeOut" }}
            />
          </svg>
        </motion.span>
        {[0, 60, 120, 180, 240, 300].map((deg, i) => (
          <motion.span
            key={deg}
            aria-hidden
            className="absolute left-1/2 top-1/2 -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full"
            style={{ background: i % 2 ? "#DBEAFE" : "#2563EB" }}
            initial={{ x: 0, y: 0, opacity: 0, scale: 0.4 }}
            animate={{
              x: Math.cos((deg * Math.PI) / 180) * 62,
              y: Math.sin((deg * Math.PI) / 180) * 62,
              opacity: [0, 1, 0],
              scale: [0.4, 1, 0.5],
            }}
            transition={{ duration: d(0.9), delay: d(0.7), ease: "easeOut" }}
          />
        ))}
      </div>
      <motion.h2
        className="text-headline-md mt-6"
        initial={{ opacity: 0, y: reduce ? 0 : 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: d(0.5), delay: d(0.8), ease: [0.22, 1, 0.36, 1] }}
      >
        {name ? `Thank you, ${name}!` : "Thank you!"}
      </motion.h2>
      <motion.p
        className="mt-2 max-w-sm text-body-lg text-muted"
        initial={{ opacity: 0, y: reduce ? 0 : 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: d(0.5), delay: d(0.95), ease: [0.22, 1, 0.36, 1] }}
      >
        We&apos;ve received your details. Our team will contact you within 24 hours.
      </motion.p>
    </motion.div>
  );
}
