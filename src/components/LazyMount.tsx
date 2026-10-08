"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Renders children only once the wrapper comes near the viewport. The wrapper keeps its size
 * (it fills its parent), so there is no layout shift. Elements inside a display:none layout never
 * intersect, so they never mount: this keeps the initial DOM small.
 */
export function LazyMount({ children, rootMargin = "800px 0px", className = "h-full" }: { children: ReactNode; rootMargin?: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || show) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setShow(true), { rootMargin });
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin, show]);
  return (
    <div ref={ref} className={className}>
      {show ? children : null}
    </div>
  );
}
