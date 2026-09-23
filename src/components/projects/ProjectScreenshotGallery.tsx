"use client";

import { useRef, useState } from "react";
import { Code2, Cpu } from "lucide-react";
import type { ProjectScreenshot } from "@/types";
import { ProjectImageFrame } from "./ProjectImageFrame";
import { ProjectImageLightbox } from "./ProjectImageLightbox";

type ProjectScreenshotGalleryProps = {
  projectTitle: string;
  category: string;
  thumbnail?: string;
  screenshots?: ProjectScreenshot[];
};

export function ProjectScreenshotGallery({
  projectTitle,
  category,
  thumbnail,
  screenshots = [],
}: ProjectScreenshotGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const Icon = category.includes("AI") ? Cpu : Code2;

  // Combine primary thumbnail with screenshots list if needed
  const galleryScreenshots = screenshots.length > 0 ? screenshots : [];

  const handleOpenLightbox = (index: number, element: HTMLButtonElement) => {
    triggerRef.current = element;
    setSelectedIndex(index);
  };

  const handleCloseLightbox = () => {
    setSelectedIndex(null);
    setTimeout(() => {
      triggerRef.current?.focus();
    }, 50);
  };

  return (
    <>
      {/* Primary Hero Screenshot */}
      <section className="my-10">
        {thumbnail ? (
          <button
            type="button"
            onClick={(e) => handleOpenLightbox(0, e.currentTarget)}
            aria-label={`Open primary screenshot for ${projectTitle}`}
            className="group block w-full text-left rounded-xl sm:rounded-2xl cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
          >
            <ProjectImageFrame
              src={thumbnail}
              alt={`${projectTitle} Primary Overview`}
              priority={true}
              caption={`${projectTitle} Primary Interface — Click to expand`}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1000px"
            />
          </button>
        ) : (
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900 p-8 flex flex-col items-center justify-center gap-4 text-center">
            <div className="rounded-full border border-sky-500/20 bg-sky-500/10 p-4 text-sky-400">
              <Icon className="h-8 w-8" />
            </div>
            <div className="space-y-1.5">
              <span className="block text-base font-semibold text-zinc-200">
                {projectTitle} Media Preview
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-zinc-900/90 px-3.5 py-1 text-xs font-mono text-zinc-400">
                Project Screenshot Pending
              </span>
            </div>
          </div>
        )}
      </section>

      {/* Dedicated Project Screenshots Gallery */}
      {galleryScreenshots.length > 0 && (
        <div className="border-t border-white/10 pt-8 space-y-6">
          <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
            Project Screenshots
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {galleryScreenshots.map((shot, idx) => {
              const isFullWidthSpan =
                shot.aspectRatio === "standard" ||
                (galleryScreenshots.length === 5 &&
                  idx === 4 &&
                  shot.aspectRatio !== "portrait");

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={(e) => handleOpenLightbox(idx, e.currentTarget)}
                  aria-label={`Open screenshot: ${shot.caption}`}
                  className={`group block w-full text-left rounded-xl sm:rounded-2xl cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 ${
                    isFullWidthSpan ? "md:col-span-2" : ""
                  }`}
                >
                  <ProjectImageFrame
                    src={shot.url}
                    alt={shot.alt}
                    caption={shot.caption}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                  />
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Lightbox Preview Modal */}
      {selectedIndex !== null && galleryScreenshots.length > 0 && (
        <ProjectImageLightbox
          screenshots={galleryScreenshots}
          selectedIndex={selectedIndex}
          onClose={handleCloseLightbox}
          onNavigate={setSelectedIndex}
        />
      )}
    </>
  );
}
