import type { ImgHTMLAttributes, ReactNode } from "react";
import assets from "./assets.json";
export function Photo({
  name,
  alt,
  className = "",
  ...props
}: { name: string; alt: string } & ImgHTMLAttributes<HTMLImageElement>) {
  const asset = assets.find((item) => item.name === name);
  if (!asset) throw new Error(`Unknown image: ${name}`);
  return (
    <img
      src={asset.file}
      srcSet={asset.srcSet}
      sizes="(max-width: 639px) calc(100vw - 40px), (max-width: 1023px) 50vw, 800px"
      width={asset.width}
      height={asset.height}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={className}
      {...props}
    />
  );
}
export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <span aria-hidden="true" className="arrow">
      {diagonal ? "↗" : "→"}
    </span>
  );
}
export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}
