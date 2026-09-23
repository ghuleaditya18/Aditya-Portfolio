import Image from "next/image";
import { Image as ImageIcon } from "lucide-react";

type ProjectImageFrameProps = {
  src: string;
  alt: string;
  caption?: string;
  priority?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  className?: string;
};

export function ProjectImageFrame({
  src,
  alt,
  caption,
  priority = false,
  width = 1920,
  height = 1080,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px",
  className = "",
}: ProjectImageFrameProps) {
  return (
    <figure className={`group flex flex-col rounded-xl sm:rounded-2xl border border-white/10 bg-zinc-950/80 p-2 sm:p-3 shadow-2xl transition-all duration-300 hover:border-sky-500/30 ${className}`}>
      <div className="relative w-full overflow-hidden rounded-lg sm:rounded-xl bg-zinc-900/50">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          sizes={sizes}
          className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.01]"
        />
      </div>

      {caption && (
        <figcaption className="mt-2.5 flex items-start gap-2 px-1 py-0.5 text-xs text-zinc-400 font-medium leading-relaxed">
          <ImageIcon className="h-3.5 w-3.5 shrink-0 text-sky-400 mt-0.5" />
          <span>{caption}</span>
        </figcaption>
      )}
    </figure>
  );
}
