"use client";

import Image from "next/image";
import { motion, type Variants } from "motion/react";
import { ArrowDown, Download, Mail } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { profileData } from "@/data/profile";
import { siteConfig } from "@/config/site";

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

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden py-10 sm:py-16 lg:py-20">
      {/* Subtle Ambient Cyan Radial Spotlight */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(56,189,248,0.08),rgba(255,255,255,0))]" />

      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid items-center gap-10 lg:grid-cols-12 lg:gap-8"
        >
          {/* Left Column: Text & Content */}
          <div className="flex flex-col items-start lg:col-span-7">
            {/* Eyebrow */}
            <motion.div variants={itemVariants} className="mb-3.5">
              <span className="inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/10 px-3.5 py-1 text-xs font-semibold tracking-wider text-sky-400 uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-400"></span>
                PYTHON FULL STACK DEVELOPER
              </span>
            </motion.div>

            {/* H1 Heading - Refined scale for optimal viewport balance */}
            <motion.h1
              variants={itemVariants}
              className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-4xl xl:text-[2.75rem] lg:leading-snug"
            >
              Building practical web applications with Python, Django, and React.
            </motion.h1>

            {/* Supporting Copy */}
            <motion.p
              variants={itemVariants}
              className="mt-5 max-w-2xl text-base text-zinc-400 sm:text-lg sm:leading-relaxed"
            >
              {profileData.bio}
            </motion.p>

            {/* Primary & Secondary CTAs */}
            <motion.div
              variants={itemVariants}
              className="mt-7 flex flex-wrap items-center gap-4 w-full sm:w-auto"
            >
              <a
                href="#projects"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-sky-500 px-6 text-sm font-semibold text-zinc-950 transition-all hover:bg-sky-400 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 shadow-sm"
              >
                View My Projects
                <ArrowDown className="h-4 w-4" />
              </a>

              <a
                href={siteConfig.links.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/10 bg-zinc-900/80 px-6 text-sm font-medium text-zinc-200 transition-all hover:border-white/20 hover:bg-zinc-800 hover:text-white hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
              >
                Download Resume
                <Download className="h-4 w-4 text-zinc-400" />
              </a>
            </motion.div>

            {/* Cohesive Connect & Core Tech Block */}
            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-col gap-3.5 border-t border-white/10 pt-6 w-full"
            >
              {/* Connect Social Links */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="w-20 text-xs font-medium uppercase tracking-wider text-zinc-500">
                  Connect:
                </span>
                <div className="flex items-center gap-2.5">
                  <a
                    href={siteConfig.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub Profile"
                    className="rounded-lg border border-white/10 bg-zinc-900/90 p-2 text-zinc-400 transition-all hover:border-white/20 hover:bg-zinc-800 hover:text-white hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                  >
                    <GithubIcon className="h-4 w-4" />
                  </a>
                  <a
                    href={siteConfig.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn Profile"
                    className="rounded-lg border border-white/10 bg-zinc-900/90 p-2 text-zinc-400 transition-all hover:border-white/20 hover:bg-zinc-800 hover:text-white hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                  >
                    <LinkedinIcon className="h-4 w-4" />
                  </a>
                  <a
                    href={siteConfig.links.email}
                    aria-label="Send Email to ghuleaditya76@gmail.com"
                    className="rounded-lg border border-white/10 bg-zinc-900/90 p-2 text-zinc-400 transition-all hover:border-white/20 hover:bg-zinc-800 hover:text-white hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                  >
                    <Mail className="h-4 w-4" />
                  </a>
                </div>
              </div>

              {/* Core Technologies Row */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="w-20 text-xs font-medium uppercase tracking-wider text-zinc-500">
                  Core Tech:
                </span>
                <div className="flex flex-wrap items-center gap-1.5">
                  {profileData.coreTechnologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-white/5 bg-zinc-900/60 px-2.5 py-1 text-xs font-medium text-zinc-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Refined Profile Image Container */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center lg:col-span-5 lg:justify-end"
          >
            <div className="relative w-full max-w-xs sm:max-w-sm lg:max-w-md">
              <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/70 p-2 shadow-xl backdrop-blur-sm ring-1 ring-white/5 transition-transform duration-300 hover:scale-[1.02]">
                <div className="aspect-[4/5] relative w-full overflow-hidden rounded-xl bg-zinc-950">
                  <Image
                    src="/images/profile.png"
                    alt="Aditya Dattu Ghule - Python Full Stack Developer"
                    fill
                    priority
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
