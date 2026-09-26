"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Container } from "./Container";

function GithubIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

function LinkedinIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.64a1.63 1.63 0 1 0 0 3.26 1.63 1.63 0 0 0 0-3.26z" />
    </svg>
  );
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const pathname = usePathname();

  // Active section tracking using IntersectionObserver
  useEffect(() => {
    if (pathname !== "/") {
      requestAnimationFrame(() => {
        setActiveSection("");
      });
      return;
    }

    const sectionIds = ["hero", "about", "experience", "projects", "skills", "education", "certifications", "contact"];
    const validSections = ["about", "experience", "projects", "skills", "education", "certifications", "contact"];

    // Inspect URL hash on mount or when returning to homepage
    const initialHash = window.location.hash.replace("#", "");
    if (validSections.includes(initialHash)) {
      requestAnimationFrame(() => {
        setActiveSection(initialHash);
      });
    }

    const visibleMap = new Map<string, IntersectionObserverEntry>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleMap.set(entry.target.id, entry);
          } else {
            visibleMap.delete(entry.target.id);
          }
        });

        if (visibleMap.size === 0) return;

        // When user is near top of page and hero is visible, clear active section
        if (window.scrollY < 100 && visibleMap.has("hero")) {
          setActiveSection("");
          return;
        }

        const visibleEntries = Array.from(visibleMap.values());
        const nonHeroEntries = visibleEntries.filter((e) => e.target.id !== "hero");

        if (nonHeroEntries.length > 0) {
          nonHeroEntries.sort(
            (a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top)
          );

          const best = nonHeroEntries[0];
          if (best.boundingClientRect.top < window.innerHeight * 0.6) {
            setActiveSection(best.target.id);
            return;
          }
        }

        if (visibleMap.has("hero")) {
          setActiveSection("");
        }
      },
      {
        rootMargin: "-20% 0px -40% 0px",
        threshold: 0,
      }
    );

    const observeSections = () => {
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    };

    observeSections();
    const rafId = requestAnimationFrame(observeSections);

    const handleHashOrPopState = () => {
      const hash = window.location.hash.replace("#", "");
      if (validSections.includes(hash)) {
        setActiveSection(hash);
      }
    };

    window.addEventListener("popstate", handleHashOrPopState);
    window.addEventListener("hashchange", handleHashOrPopState);

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener("popstate", handleHashOrPopState);
      window.removeEventListener("hashchange", handleHashOrPopState);
    };
  }, [pathname]);

  // Synchronize URL hash with activeSection without polluting browser history
  useEffect(() => {
    if (typeof window === "undefined" || window.location.pathname !== "/") return;

    if (activeSection) {
      const targetHash = `#${activeSection}`;
      if (window.location.hash !== targetHash) {
        window.history.replaceState(null, "", targetHash);
      }
    } else {
      // Hero state: clean URL to / when user is at top of page
      if (window.location.hash !== "" && window.scrollY < 100) {
        window.history.replaceState(null, "", window.location.pathname);
      }
    }
  }, [activeSection]);

  // Close menu on ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/80 backdrop-blur-md transition-colors">
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Brand */}
          <Link
            href="/#hero"
            className="group rounded-md px-1 py-0.5 text-lg font-bold tracking-tight text-white transition-colors hover:text-sky-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
          >
            Aditya Ghule
            <span className="text-sky-400 transition-opacity group-hover:opacity-100">
              .
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            aria-label="Main Navigation"
            className="hidden items-center gap-4 md:flex lg:gap-6 xl:gap-8"
          >
            {siteConfig.navItems.map((item) => {
              const sectionId = item.href.replace("/#", "");
              const isActive = activeSection === sectionId;

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "relative rounded-md px-2 py-1 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400",
                    isActive ? "text-sky-400 font-semibold" : "text-zinc-400 hover:text-white"
                  )}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-sky-400"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right Social Links */}
          <div className="hidden items-center gap-3 md:flex">
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="rounded-lg border border-white/10 bg-zinc-900 p-2 text-zinc-400 transition-all hover:border-white/20 hover:bg-zinc-800 hover:text-white hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            >
              <GithubIcon className="h-4 w-4" />
            </a>
            <a
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="rounded-lg border border-white/10 bg-zinc-900 p-2 text-zinc-400 transition-all hover:border-white/20 hover:bg-zinc-800 hover:text-white hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            >
              <LinkedinIcon className="h-4 w-4" />
            </a>
          </div>

          {/* Mobile Menu Hamburger Button */}
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={toggleMenu}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              className="rounded-lg border border-white/10 bg-zinc-900 p-2 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden border-b border-white/10 bg-zinc-950/95 backdrop-blur-xl md:hidden"
          >
            <Container className="py-6">
              <nav aria-label="Mobile Navigation" className="flex flex-col gap-4">
                {siteConfig.navItems.map((item) => {
                  const sectionId = item.href.replace("/#", "");
                  const isActive = activeSection === sectionId;

                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={closeMenu}
                      className={cn(
                        "rounded-lg px-3 py-2 text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400",
                        isActive ? "bg-sky-500/10 text-sky-400 font-semibold" : "text-zinc-300 hover:bg-zinc-900 hover:text-white"
                      )}
                    >
                      {item.label}
                    </Link>
                  );
                })}

                <div className="mt-4 flex items-center gap-4 border-t border-white/10 pt-4">
                  <a
                    href={siteConfig.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub Profile"
                    onClick={closeMenu}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-white/10 bg-zinc-900 px-4 py-2.5 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                  >
                    <GithubIcon className="h-4 w-4" />
                    GitHub
                  </a>
                  <a
                    href={siteConfig.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn Profile"
                    onClick={closeMenu}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-white/10 bg-zinc-900 px-4 py-2.5 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                  >
                    <LinkedinIcon className="h-4 w-4" />
                    LinkedIn
                  </a>
                </div>
              </nav>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
