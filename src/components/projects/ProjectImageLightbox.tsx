"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, Image as ImageIcon, X } from "lucide-react";
import type { ProjectScreenshot } from "@/types";

type ProjectImageLightboxProps = {
  screenshots: ProjectScreenshot[];
  selectedIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

export function ProjectImageLightbox({
  screenshots,
  selectedIndex,
  onClose,
  onNavigate,
}: ProjectImageLightboxProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const currentScreenshot = screenshots[selectedIndex];
  const totalScreenshots = screenshots.length;

  const handlePrev = () => {
    onNavigate((selectedIndex - 1 + totalScreenshots) % totalScreenshots);
  };

  const handleNext = () => {
    onNavigate((selectedIndex + 1) % totalScreenshots);
  };

  // Focus trigger on mount
  useEffect(() => {
    closeButtonRef.current?.focus();
  }, []);

  // Lock body scroll while lightbox is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Keyboard navigation & focus trap
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        onNavigate((selectedIndex - 1 + totalScreenshots) % totalScreenshots);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        onNavigate((selectedIndex + 1) % totalScreenshots);
      } else if (e.key === "Tab" && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;

        const firstElement = focusables[0];
        const lastElement = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, totalScreenshots, onClose, onNavigate]);

  return (
    <AnimatePresence>
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Project Screenshot Preview"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex flex-col justify-between bg-zinc-950/95 backdrop-blur-xl p-4 sm:p-6"
        onClick={onClose}
      >
        {/* Top Bar: Counter & Close Button */}
        <div
          className="flex items-center justify-between border-b border-white/10 pb-4 w-full max-w-5xl mx-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-zinc-900 px-3.5 py-1 text-xs font-mono font-medium text-zinc-300">
            Image {selectedIndex + 1} of {totalScreenshots}
          </span>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close screenshot preview"
            className="rounded-lg border border-white/10 bg-zinc-900 p-2 text-zinc-400 transition-colors hover:border-white/20 hover:bg-zinc-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Center Display: Previous Button, Image, Next Button */}
        <div
          className="relative flex flex-1 items-center justify-center py-4 w-full max-w-6xl mx-auto overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Previous Button */}
          {totalScreenshots > 1 && (
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous screenshot"
              className="absolute left-2 sm:left-4 z-10 rounded-full border border-white/10 bg-zinc-900/90 p-3 text-zinc-300 backdrop-blur-md transition-all hover:border-white/30 hover:bg-zinc-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          )}

          {/* Screenshot Display */}
          <div className="relative flex max-h-[70vh] sm:max-h-[75vh] w-full items-center justify-center p-2">
            <Image
              src={currentScreenshot.url}
              alt={currentScreenshot.alt}
              width={1920}
              height={1080}
              priority
              sizes="(max-width: 768px) 100vw, 1200px"
              className="max-h-[70vh] sm:max-h-[75vh] w-auto max-w-full object-contain rounded-xl border border-white/10 shadow-2xl"
            />
          </div>

          {/* Next Button */}
          {totalScreenshots > 1 && (
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next screenshot"
              className="absolute right-2 sm:right-4 z-10 rounded-full border border-white/10 bg-zinc-900/90 p-3 text-zinc-300 backdrop-blur-md transition-all hover:border-white/30 hover:bg-zinc-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          )}
        </div>

        {/* Bottom Caption Bar */}
        <div
          className="flex items-center justify-center border-t border-white/10 pt-4 w-full max-w-4xl mx-auto text-center"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-zinc-900/90 px-4 py-2 text-xs sm:text-sm font-medium text-zinc-300">
            <ImageIcon className="h-4 w-4 shrink-0 text-sky-400" />
            <span>{currentScreenshot.caption}</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
