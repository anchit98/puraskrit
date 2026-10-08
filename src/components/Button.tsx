import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "./Icon";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 h-12 text-label-lg transition-all duration-200 select-none active:scale-[0.97]";
const variants: Record<Variant, string> = {
  primary:
    "bg-primary text-on-primary shadow-[0_8px_24px_rgba(37,99,235,0.28)] hover:shadow-[0_12px_30px_rgba(37,99,235,0.36)] hover:-translate-y-0.5 active:bg-on-primary-container",
  secondary: "bg-card text-navy border border-outline hover:border-outline-variant hover:-translate-y-0.5 shadow-card",
  ghost: "text-primary hover:bg-icon-bg",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  arrow = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  arrow?: boolean;
  className?: string;
}) {
  const external = /^https?:/.test(href);
  const cls = `${base} ${variants[variant]} ${className}`;
  const inner = (
    <>
      {children}
      {arrow && <Icon name="arrowRight" size={18} />}
    </>
  );
  if (external)
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    );
  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

export const buttonClass = (variant: Variant = "primary") => `${base} ${variants[variant]}`;
