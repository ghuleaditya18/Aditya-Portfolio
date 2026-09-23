"use client";

import Link from "next/link";
import { motion, type Variants } from "motion/react";
import { ArrowRight, Clock, Code2, Cpu, ExternalLink, Sparkles } from "lucide-react";
import type { Project } from "@/types";
import { ProjectImageFrame } from "./ProjectImageFrame";

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

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

function ProjectMediaPlaceholder({ title, category }: { title: string; category: string }) {
  const Icon = category.includes("AI") ? Cpu : Code2;

  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900 p-6 flex flex-col items-center justify-center gap-3 text-center group-hover:border-sky-500/30 transition-colors">
      <div className="rounded-full border border-sky-500/20 bg-sky-500/10 p-3 text-sky-400">
        <Icon className="h-6 w-6" />
      </div>
      <div className="space-y-1">
        <span className="block text-sm font-semibold text-zinc-200">{title}</span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-zinc-900/90 px-3 py-1 text-[11px] font-mono text-zinc-400">
          Project Screenshot Pending
        </span>
      </div>
    </div>
  );
}

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const isHeroLayout = project.featuredLayout === "hero";

  return (
    <motion.article
      variants={itemVariants}
      className={`group relative flex flex-col justify-between rounded-2xl border ${
        project.category.includes("AI")
          ? "border-sky-500/20 bg-zinc-900/70"
          : "border-white/10 bg-zinc-900/60"
      } p-6 sm:p-8 backdrop-blur-sm shadow-xl transition-all duration-300 hover:border-sky-500/40 hover:bg-zinc-900/80 ${
        isHeroLayout ? "lg:col-span-12" : "lg:col-span-6"
      }`}
    >
      <div className={isHeroLayout ? "grid gap-8 lg:grid-cols-12 lg:items-center" : "flex flex-col gap-6"}>
        {/* Visual / Screenshot Area */}
        <div className={isHeroLayout ? "lg:col-span-5" : "w-full"}>
          {project.thumbnail ? (
            <ProjectImageFrame
              src={project.thumbnail}
              alt={`${project.title} screenshot`}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 450px"
            />
          ) : (
            <ProjectMediaPlaceholder title={project.title} category={project.category} />
          )}
        </div>

        {/* Text Details Area */}
        <div className={isHeroLayout ? "flex flex-col gap-4 lg:col-span-7" : "flex flex-col gap-4"}>
          {/* Header Badges */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center rounded-full border border-sky-500/20 bg-sky-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-sky-400">
                {project.category}
              </span>
              {project.isFeatured && (
                <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-400">
                  <Sparkles className="h-3.5 w-3.5" />
                  Featured
                </span>
              )}
            </div>

            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} source code on GitHub (opens in a new tab)`}
              className="rounded-lg border border-white/10 bg-zinc-900 p-2 text-zinc-400 transition-all hover:border-white/20 hover:bg-zinc-800 hover:text-white hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            >
              <GithubIcon className="h-4 w-4" />
            </a>
          </div>

          {/* Title & Description */}
          <div>
            <h3 className="text-xl font-bold tracking-tight text-white sm:text-2xl group-hover:text-sky-300 transition-colors">
              <Link href={`/projects/${project.slug}`}>
                {project.title}
              </Link>
            </h3>
            <p className="mt-2.5 text-sm text-zinc-300 sm:text-base leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Core Technologies Badges */}
          {project.coreTechnologies && (
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              {project.coreTechnologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-white/5 bg-zinc-800/80 px-2.5 py-1 text-xs font-medium text-zinc-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          {/* Verified Feature Bullets (Top 2) */}
          <ul className="space-y-1.5 text-xs sm:text-sm text-zinc-300 pt-1">
            {project.features.slice(0, 2).map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400" />
                <span className="leading-relaxed">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="mt-6 border-t border-white/10 pt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Primary View Case Study Button */}
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-2 rounded-lg bg-sky-500 px-4 py-2 text-xs sm:text-sm font-semibold text-zinc-950 transition-all hover:bg-sky-400 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
          >
            View Case Study
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>

          {/* Secondary Source Code Button */}
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-zinc-900 px-3.5 py-2 text-xs sm:text-sm font-medium text-zinc-200 transition-all hover:border-white/20 hover:bg-zinc-800 hover:text-white hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
          >
            <GithubIcon className="h-4 w-4" />
            Source Code
            <ExternalLink className="h-3.5 w-3.5 text-zinc-400" />
          </a>
        </div>

        {/* Non-clickable Live Deployment Status Indicator */}
        <span
          className="inline-flex items-center gap-1.5 rounded-full border border-white/5 bg-zinc-950/80 px-3 py-1.5 text-xs font-medium text-zinc-400 cursor-default"
          title="This project is not deployed to a live server yet."
        >
          <Clock className="h-3.5 w-3.5 text-zinc-500" />
          Not deployed yet
        </span>
      </div>
    </motion.article>
  );
}
