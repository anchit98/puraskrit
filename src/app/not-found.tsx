import { ButtonLink } from "@/components/Button";

export default function NotFound() {
  return (
    <section className="bg-wash">
      <div className="container-page flex min-h-[60vh] flex-col items-start justify-center py-20">
        <p className="text-overline text-primary">404</p>
        <h1 className="text-display mt-3">This page isn&apos;t here.</h1>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/">Go to home</ButtonLink>
          <ButtonLink href="/#download" variant="secondary">
            Get the app
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
