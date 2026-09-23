"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { Award, Building2, X } from "lucide-react";
import type { Certification } from "@/types";

type CertificateLightboxProps = {
  certification: Certification | null;
  onClose: () => void;
};

export function CertificateLightbox({
  certification,
  onClose,
}: CertificateLightboxProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Focus trigger on mount
  useEffect(() => {
    if (certification) {
      closeButtonRef.current?.focus();
    }
  }, [certification]);

  // Lock body scroll while lightbox is open
  useEffect(() => {
    if (certification) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [certification]);

  // Keyboard navigation & focus trap
  useEffect(() => {
    if (!certification) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
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
  }, [certification, onClose]);

  if (!certification || !certification.image) return null;

  return (
    <AnimatePresence>
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={`${certification.title} Certificate Preview`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex flex-col justify-between bg-zinc-950/95 backdrop-blur-xl p-4 sm:p-6"
        onClick={onClose}
      >
        {/* Top Bar: Title, Issuer & Close Button */}
        <div
          className="flex items-center justify-between border-b border-white/10 pb-4 w-full max-w-5xl mx-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-3">
            <span className="rounded-lg border border-sky-500/20 bg-sky-500/10 p-2 text-sky-400 shrink-0">
              <Award className="h-4 w-4" />
            </span>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white">
                {certification.title}
              </h3>
              <p className="text-xs text-zinc-400 flex items-center gap-1.5 mt-0.5">
                <Building2 className="h-3.5 w-3.5 text-sky-400 shrink-0" />
                <span>{certification.issuer}</span>
              </p>
            </div>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close certificate preview"
            className="rounded-lg border border-white/10 bg-zinc-900 p-2 text-zinc-400 transition-colors hover:border-white/20 hover:bg-zinc-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Center Display: Certificate Image */}
        <div
          className="relative flex flex-1 items-center justify-center py-4 w-full max-w-6xl mx-auto overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative flex max-h-[80vh] w-full items-center justify-center p-2">
            <Image
              src={certification.image}
              alt={`${certification.title} certificate`}
              width={3508}
              height={2481}
              priority
              sizes="(max-width: 768px) 100vw, 1400px"
              className="max-h-[80vh] w-auto max-w-full object-contain rounded-xl border border-white/10 shadow-2xl"
            />
          </div>
        </div>

        {/* Bottom Bar: Action Hint */}
        <div
          className="flex items-center justify-center border-t border-white/10 pt-3 w-full max-w-4xl mx-auto text-center"
          onClick={(e) => e.stopPropagation()}
        >
          <span className="text-xs font-medium text-zinc-400">
            Press <kbd className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300 font-mono">ESC</kbd> or click outside to close
          </span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
