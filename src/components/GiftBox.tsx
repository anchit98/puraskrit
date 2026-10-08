/**
 * Gift box drawn as an isometric 3D form in SVG, built only from the DESIGN.md palette
 * (#2563EB, #1A2B4A, #DBEAFE, #EFF6FF, white). Flat faces, no gradients.
 * SVG (not nested CSS 3D) so it renders identically in Safari/WebKit, Chrome and Firefox.
 * Unlocking lifts the lid, adds a soft glow and a one-off sparkle (skipped for reduced motion).
 */
const LOCKED = { left: "#FFFFFF", right: "#EFF6FF", top: "#EFF6FF", ribbon: "#DBEAFE", inside: "#DBEAFE", line: "#DBEAFE" };
const OPEN = { left: "#2563EB", right: "#1A2B4A", top: "#DBEAFE", ribbon: "#FFFFFF", inside: "#1A2B4A", line: "#1A2B4A" };

export function GiftBox({ size = 40, unlocked, animate = true }: { size?: number; unlocked: boolean; animate?: boolean }) {
  const c = unlocked ? OPEN : LOCKED;
  const fill = (color: string) => ({ fill: color, transition: animate ? "fill 550ms cubic-bezier(0.22,1,0.36,1)" : undefined });
  const lidStyle = {
    transformBox: "view-box" as const,
    transformOrigin: "50px 64px",
    transform: unlocked ? "translateY(-20px) rotate(-12deg)" : "none",
    transition: animate ? "transform 700ms cubic-bezier(0.22,1,0.36,1)" : undefined,
  };
  return (
    <div aria-hidden className="relative" style={{ width: size * 1.6, height: size * 1.8 }}>
      {/* Soft glow when unlocked */}
      <span
        className="absolute bottom-[2%] left-1/2 h-[18%] w-[80%] -translate-x-1/2 rounded-full transition-opacity duration-700"
        style={{ background: "rgba(37,99,235,0.22)", boxShadow: "0 0 24px 10px rgba(37,99,235,0.26)", opacity: unlocked ? 1 : 0 }}
      />
      <svg viewBox="0 0 100 112" className="absolute inset-0 h-full w-full overflow-visible">
        <g stroke={c.line} strokeWidth={1} strokeLinejoin="round" style={{ transition: animate ? "stroke 550ms" : undefined }}>
          {/* Body */}
          <polygon points="15,58 50,73 85,58 50,43" style={fill(c.inside)} />
          <polygon points="15,58 50,73 50,108 15,93" style={fill(c.left)} />
          <polygon points="50,73 85,58 85,93 50,108" style={fill(c.right)} />
          {/* Body ribbons */}
          <polygon points="29.5,64 35.5,66.6 35.5,101.6 29.5,99" style={fill(c.ribbon)} stroke="none" />
          <polygon points="64.5,66.6 70.5,64 70.5,99 64.5,101.6" style={fill(c.ribbon)} stroke="none" />
          {/* Lid */}
          <g style={lidStyle}>
            <polygon points="11,49 50,66 50,74 11,57" style={fill(c.left)} />
            <polygon points="50,66 89,49 89,57 50,74" style={fill(c.right)} />
            <polygon points="11,49 50,66 89,49 50,32" style={fill(c.top)} />
            <polygon points="27,56 33,58.6 33,66.6 27,64" style={fill(c.ribbon)} stroke="none" />
            <polygon points="67,58.6 73,56 73,64 67,66.6" style={fill(c.ribbon)} stroke="none" />
            <polygon points="26,42.5 31,40.3 74,59 69,61.2" style={fill(c.ribbon)} stroke="none" />
            <polygon points="69,40.3 74,42.5 31,61.2 26,59" style={fill(c.ribbon)} stroke="none" />
            {/* Bow */}
            <ellipse cx="43" cy="44" rx="7" ry="4.5" style={fill(c.ribbon)} />
            <ellipse cx="57" cy="44" rx="7" ry="4.5" style={fill(c.ribbon)} />
          </g>
        </g>
      </svg>
      {/* One-off sparkle when it unlocks */}
      {unlocked && animate && (
        <span key="sparkle" className="pointer-events-none absolute left-1/2 top-[22%]">
          {[0, 60, 120, 180, 240, 300].map((deg, i) => (
            <span
              key={deg}
              className="sparkle absolute h-1.5 w-1.5 rounded-full"
              style={{ background: i % 2 ? "#DBEAFE" : "#2563EB", ["--a" as string]: `${deg}deg` }}
            />
          ))}
        </span>
      )}
    </div>
  );
}
