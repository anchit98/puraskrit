import { IconBubble, type IconName } from "./Icon";
import { Tilt3D } from "./Tilt3D";

export function FeatureCard({ icon, title, body, compact = false, big = false }: { icon: IconName; title: string; body?: string; compact?: boolean; big?: boolean }) {
  return (
    <Tilt3D className="rounded-[20px]">
      <article className={`card h-full ${compact ? "p-5" : "p-6 md:p-7"}`}>
        <IconBubble name={icon} size={compact ? 44 : 52} />
        <h3 className={`mt-5 ${big ? "text-headline-md" : "text-title-md"}`}>{title}</h3>
        {body && <p className={`mt-2 text-muted ${big ? "text-body-lg" : "text-body-md"}`}>{body}</p>}
      </article>
    </Tilt3D>
  );
}
