"use client";

import { motion, type Variants } from "motion/react";
import {
  ArrowUpRight,
  Download,
  FileText,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/layout/SectionHeading";
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
      staggerChildren: 0.15,
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

export function Contact() {
  return (
    <section id="contact" className="relative border-t border-white/5 py-16 sm:py-24">
      <Container>
        <SectionHeading
          badge="CONTACT"
          title="Let's Connect"
          subtitle="Open to software engineering opportunities, technical discussions, and professional networking."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-col gap-6 max-w-4xl"
        >
          {/* Row 1: Primary Direct Contact Cards (Email & Phone) */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* Email Card */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col justify-between gap-5 rounded-2xl border border-white/10 bg-zinc-900/60 p-6 sm:p-8 backdrop-blur-sm shadow-xl transition-all hover:border-white/20"
            >
              <div>
                <div className="flex items-center gap-3">
                  <div className="rounded-lg border border-sky-500/20 bg-sky-500/10 p-2.5 text-sky-400 shrink-0">
                    <Mail className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-sky-400">
                    Primary Email
                  </span>
                </div>
                <div className="mt-4">
                  <a
                    href={`mailto:${profileData.email}`}
                    aria-label="Email Aditya Ghule"
                    className="text-lg sm:text-xl font-bold text-white transition-colors hover:text-sky-400 font-mono break-all"
                  >
                    {profileData.email}
                  </a>
                </div>
              </div>

              <div className="border-t border-white/5 pt-4">
                <a
                  href={`mailto:${profileData.email}`}
                  aria-label="Email Aditya Ghule"
                  className="inline-flex items-center gap-2 rounded-lg border border-sky-500/20 bg-sky-500/10 px-4 py-2.5 text-xs font-semibold text-sky-400 transition-all hover:bg-sky-500/20 hover:border-sky-500/30 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                >
                  <span>Send Email</span>
                  <ArrowUpRight className="h-4 w-4 shrink-0" />
                </a>
              </div>
            </motion.div>

            {/* Phone Card */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col justify-between gap-5 rounded-2xl border border-white/10 bg-zinc-900/60 p-6 sm:p-8 backdrop-blur-sm shadow-xl transition-all hover:border-white/20"
            >
              <div>
                <div className="flex items-center gap-3">
                  <div className="rounded-lg border border-sky-500/20 bg-sky-500/10 p-2.5 text-sky-400 shrink-0">
                    <Phone className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-sky-400">
                    Phone / Mobile
                  </span>
                </div>
                <div className="mt-4">
                  <a
                    href={profileData.phoneTel || `tel:${profileData.phone}`}
                    aria-label="Call Aditya Ghule"
                    className="text-lg sm:text-xl font-bold text-white transition-colors hover:text-sky-400 font-mono"
                  >
                    {profileData.phone}
                  </a>
                </div>
              </div>

              <div className="border-t border-white/5 pt-4">
                <a
                  href={profileData.phoneTel || `tel:${profileData.phone}`}
                  aria-label="Call Aditya Ghule"
                  className="inline-flex items-center gap-2 rounded-lg border border-sky-500/20 bg-sky-500/10 px-4 py-2.5 text-xs font-semibold text-sky-400 transition-all hover:bg-sky-500/20 hover:border-sky-500/30 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                >
                  <span>Call Now</span>
                  <ArrowUpRight className="h-4 w-4 shrink-0" />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Row 2: Secondary Info Grid (Location, Professional Profiles, Resume) */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {/* Location Card */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col justify-between gap-4 rounded-2xl border border-white/10 bg-zinc-900/60 p-6 backdrop-blur-sm shadow-xl transition-all hover:border-white/20"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-lg border border-sky-500/20 bg-sky-500/10 p-2.5 text-sky-400 shrink-0">
                  <MapPin className="h-4 w-4" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider text-sky-400">
                  Location
                </span>
              </div>
              <p className="text-sm font-medium text-zinc-200 leading-relaxed">
                {profileData.location}
              </p>
            </motion.div>

            {/* Professional Profiles Card */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col justify-between gap-4 rounded-2xl border border-white/10 bg-zinc-900/60 p-6 backdrop-blur-sm shadow-xl transition-all hover:border-white/20"
            >
              <span className="text-xs font-semibold uppercase tracking-wider text-sky-400">
                Professional Profiles
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={profileData.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open Aditya Ghule's LinkedIn profile"
                  className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-zinc-800/80 px-3 py-2 text-xs font-medium text-zinc-200 transition-colors hover:bg-zinc-700 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                >
                  <LinkedinIcon className="h-4 w-4 text-sky-400" />
                  LinkedIn
                </a>
                <a
                  href={profileData.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open Aditya Ghule's GitHub profile"
                  className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-zinc-800/80 px-3 py-2 text-xs font-medium text-zinc-200 transition-colors hover:bg-zinc-700 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                >
                  <GithubIcon className="h-4 w-4 text-zinc-300" />
                  GitHub
                </a>
              </div>
            </motion.div>

            {/* Resume Card */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col justify-between gap-4 rounded-2xl border border-white/10 bg-zinc-900/60 p-6 backdrop-blur-sm shadow-xl transition-all hover:border-white/20"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-lg border border-sky-500/20 bg-sky-500/10 p-2.5 text-sky-400 shrink-0">
                  <FileText className="h-4 w-4" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider text-sky-400">
                  Resume / CV
                </span>
              </div>
              <a
                href={siteConfig.links.resume}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View Aditya Ghule's resume"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-sky-500/20 bg-sky-500/10 px-3 py-2 text-xs font-semibold text-sky-400 transition-all hover:bg-sky-500/20 hover:border-sky-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
              >
                <Download className="h-3.5 w-3.5 shrink-0" />
                <span>View Resume</span>
              </a>
            </motion.div>
          </div>

          {/* Row 3: Closing Footer Bar */}
          <motion.div
            variants={itemVariants}
            className="mt-10 border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500"
          >
            <span>© {new Date().getFullYear()} Aditya Dattu Ghule. All rights reserved.</span>
            <span>Python Full Stack Developer</span>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
