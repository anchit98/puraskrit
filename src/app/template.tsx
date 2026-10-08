"use client";

import { useEffect, type ReactNode } from "react";

// First load renders without a fade (instant first paint); later client navigations fade in.
let hasNavigated = false;

export default function Template({ children }: { children: ReactNode }) {
  const animate = hasNavigated;
  useEffect(() => {
    hasNavigated = true;
  }, []);
  return <div className={animate ? "page-in" : undefined}>{children}</div>;
}
