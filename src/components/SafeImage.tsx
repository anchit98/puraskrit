"use client";

import { useState } from "react";
import { Icon } from "./Icon";

/**
 * <img> with a graceful fallback: if the file fails to load, a calm placeholder takes its place
 * (same size, palette colours) instead of a broken-image icon.
 */
export function SafeImage({
  src,
  srcSet,
  sizes,
  alt,
  width,
  height,
  className = "",
  loading = "lazy",
  fit = "contain",
}: {
  src: string;
  srcSet?: string;
  sizes?: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  loading?: "eager" | "lazy";
  fit?: "contain" | "fill";
}) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex items-center justify-center bg-icon-bg text-primary ${className}`}
        style={{ aspectRatio: `${width} / ${height}` }}
      >
        <Icon name="store" size={40} strokeWidth={1.4} />
      </div>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      decoding="async"
      onError={() => setFailed(true)}
      className={`${fit === "contain" ? "object-contain" : ""} ${className}`}
    />
  );
}
