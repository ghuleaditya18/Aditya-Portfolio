"use client";

import { useState, useEffect } from "react";
import { motion, type Variants } from "motion/react";
import {
  AlertCircle,
  ArrowUpRight,
  CheckCircle2,
  Download,
  FileText,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { profileData } from "@/data/profile";
import { siteConfig } from "@/config/site";

const VALID_SERVICES = [
  "Web Development",
  "Frontend Development",
  "Backend Development",
  "Full Stack Development",
  "REST API Development",
] as const;

type ServiceType = (typeof VALID_SERVICES)[number];

function parseServiceValue(val: string | null | undefined): ServiceType | null {
  if (!val) return null;
  const decoded = decodeURIComponent(val).trim().toLowerCase();
  for (const service of VALID_SERVICES) {
    if (service.toLowerCase() === decoded) return service;
    const slugified = service.toLowerCase().replace(/\s+/g, "-");
    if (slugified === decoded) return service;
  }
  return null;
}

function getServiceFromUrl(): ServiceType | null {
  if (typeof window === "undefined") return null;

  try {
    const searchParams = new URLSearchParams(window.location.search);
    const searchService = searchParams.get("service");

    let hashService: string | null = null;
    if (window.location.hash.includes("?")) {
      const hashQuery = window.location.hash.split("?")[1];
      const hashParams = new URLSearchParams(hashQuery);
      hashService = hashParams.get("service");
    }

    const rawService = searchService || hashService;
    return parseServiceValue(rawService);
  } catch {
    return null;
  }
}

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
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    service: ServiceType;
    message: string;
  }>({
    name: "",
    email: "",
    service: "Web Development",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const syncServiceFromUrl = () => {
      const urlService = getServiceFromUrl();
      if (urlService) {
        setFormData((prev) => ({ ...prev, service: urlService }));
      }
    };

    syncServiceFromUrl();

    const handleCustomEvent = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail) {
        const parsed = parseServiceValue(customEvent.detail);
        if (parsed) {
          setFormData((prev) => ({ ...prev, service: parsed }));
        }
      }
    };

    window.addEventListener("popstate", syncServiceFromUrl);
    window.addEventListener("hashchange", syncServiceFromUrl);
    window.addEventListener("portfolio:select-service", handleCustomEvent);

    return () => {
      window.removeEventListener("popstate", syncServiceFromUrl);
      window.removeEventListener("hashchange", syncServiceFromUrl);
      window.removeEventListener("portfolio:select-service", handleCustomEvent);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    if (!formData.name.trim()) {
      setStatus("error");
      setErrorMessage("Please enter your name.");
      return;
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    if (!formData.message.trim()) {
      setStatus("error");
      setErrorMessage("Please enter your message.");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setStatus("error");
        setErrorMessage(data.error || "Failed to send message. Please try again.");
        return;
      }

      setStatus("success");
      setFormData({
        name: "",
        email: "",
        service: "Web Development",
        message: "",
      });
    } catch {
      setStatus("error");
      setErrorMessage("An unexpected network error occurred. Please check your connection and try again.");
    }
  };

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
          {/* Row 1: Send Me a Message Form Card */}
          <motion.div
            variants={itemVariants}
            className="rounded-2xl border border-white/10 bg-zinc-900/60 p-6 sm:p-8 backdrop-blur-sm shadow-xl transition-all hover:border-white/20"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="rounded-lg border border-sky-500/20 bg-sky-500/10 p-2.5 text-sky-400 shrink-0">
                <Send className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white sm:text-xl">
                  Send Me a Message
                </h3>
                <p className="text-xs text-zinc-400">
                  Fill out the form below to get in touch regarding services or engineering opportunities.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {/* Name Field */}
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-semibold uppercase tracking-wider text-sky-400 mb-2"
                  >
                    Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your full name"
                    disabled={status === "submitting"}
                    className="w-full rounded-lg border border-white/10 bg-zinc-950/80 px-4 py-2.5 text-sm text-white placeholder-zinc-500 transition-colors focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/20 disabled:opacity-50"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-semibold uppercase tracking-wider text-sky-400 mb-2"
                  >
                    Email <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your.email@example.com"
                    disabled={status === "submitting"}
                    className="w-full rounded-lg border border-white/10 bg-zinc-950/80 px-4 py-2.5 text-sm text-white placeholder-zinc-500 transition-colors focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/20 disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Service Dropdown Field */}
              <div>
                <label
                  htmlFor="contact-service"
                  className="block text-xs font-semibold uppercase tracking-wider text-sky-400 mb-2"
                >
                  Service <span className="text-red-400">*</span>
                </label>
                <select
                  id="contact-service"
                  name="service"
                  required
                  value={formData.service}
                  onChange={(e) =>
                    setFormData({ ...formData, service: e.target.value as ServiceType })
                  }
                  disabled={status === "submitting"}
                  className="w-full rounded-lg border border-white/10 bg-zinc-950/80 px-4 py-2.5 text-sm text-white transition-colors focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/20 disabled:opacity-50 cursor-pointer"
                >
                  <option value="Web Development" className="bg-zinc-900 text-white">
                    Web Development
                  </option>
                  <option value="Frontend Development" className="bg-zinc-900 text-white">
                    Frontend Development
                  </option>
                  <option value="Backend Development" className="bg-zinc-900 text-white">
                    Backend Development
                  </option>
                  <option value="Full Stack Development" className="bg-zinc-900 text-white">
                    Full Stack Development
                  </option>
                  <option value="REST API Development" className="bg-zinc-900 text-white">
                    REST API Development
                  </option>
                </select>
              </div>

              {/* Message Field */}
              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-semibold uppercase tracking-wider text-sky-400 mb-2"
                >
                  Message <span className="text-red-400">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about your project or inquiry..."
                  disabled={status === "submitting"}
                  className="w-full rounded-lg border border-white/10 bg-zinc-950/80 px-4 py-2.5 text-sm text-white placeholder-zinc-500 transition-colors focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/20 disabled:opacity-50 resize-y"
                />
              </div>

              {/* Feedback Alerts */}
              {status === "success" && (
                <div
                  role="alert"
                  aria-live="polite"
                  className="flex items-center gap-2.5 rounded-lg border border-sky-500/30 bg-sky-500/10 p-4 text-xs font-medium text-sky-300"
                >
                  <CheckCircle2 className="h-4 w-4 text-sky-400 shrink-0" />
                  <span>Your message has been sent successfully! I will get back to you soon.</span>
                </div>
              )}

              {status === "error" && (
                <div
                  role="alert"
                  aria-live="polite"
                  className="flex items-center gap-2.5 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-xs font-medium text-red-300"
                >
                  <AlertCircle className="h-4 w-4 text-red-400 shrink-0" />
                  <span>{errorMessage || "Failed to send message. Please try again."}</span>
                </div>
              )}

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-sky-500 px-6 py-3 text-xs sm:text-sm font-semibold text-zinc-950 transition-all hover:bg-sky-400 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin shrink-0" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 shrink-0" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>

          {/* Row 2: Primary Direct Contact Cards (Email & Phone) */}
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

          {/* Secondary Info Grid (Location, Professional Profiles, Resume) */}
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
        </motion.div>
      </Container>
    </section>
  );
}

