import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  ExternalLink,
  Layers,
  Sparkles,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { ProjectScreenshotGallery } from "@/components/projects/ProjectScreenshotGallery";
import { projectsData } from "@/data/projects";

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

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} — Case Study`,
    description: project.description,
    alternates: {
      canonical: `https://adityaghule.dev/projects/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} — Case Study | Aditya Dattu Ghule`,
      description: project.description,
      url: `https://adityaghule.dev/projects/${project.slug}`,
      type: "article",
    },
  };
}

export default async function ProjectCaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const projectIndex = projectsData.findIndex((p) => p.slug === slug);

  if (projectIndex === -1) {
    notFound();
  }

  const project = projectsData[projectIndex];
  const caseStudy = project.caseStudy;

  const prevProject =
    projectIndex > 0 ? projectsData[projectIndex - 1] : null;
  const nextProject =
    projectIndex < projectsData.length - 1
      ? projectsData[projectIndex + 1]
      : null;

  return (
    <main className="flex-1 py-12 sm:py-16">
      <Container className="max-w-4xl">
        {/* Back Navigation */}
        <div className="mb-8">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-zinc-900/80 px-3.5 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:border-white/20 hover:bg-zinc-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
          >
            <ArrowLeft className="h-4 w-4 text-sky-400" />
            Back to Projects
          </Link>
        </div>

        {/* Case Study Header */}
        <header className="border-b border-white/10 pb-8">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center rounded-full border border-sky-500/20 bg-sky-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-sky-400">
              {project.category}
            </span>
            {project.isFeatured && (
              <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-400">
                <Sparkles className="h-3.5 w-3.5" />
                Featured Project
              </span>
            )}
          </div>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {project.title}
          </h1>

          <p className="mt-4 text-base text-zinc-300 sm:text-lg sm:leading-relaxed">
            {project.description}
          </p>

          {/* Action CTAs */}
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-sky-500 px-5 text-sm font-semibold text-zinc-950 transition-all hover:bg-sky-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            >
              <GithubIcon className="h-4 w-4" />
              Source Code Repository
              <ExternalLink className="h-3.5 w-3.5 text-zinc-950/70" />
            </a>

            <span
              className="inline-flex h-10 items-center gap-2 rounded-xl border border-white/10 bg-zinc-900/80 px-4 text-xs font-medium text-zinc-400 cursor-default"
              title="This project is not deployed to a live server yet."
            >
              <Clock className="h-4 w-4 text-zinc-500" />
              Not deployed yet
            </span>
          </div>
        </header>

        {/* Interactive Screenshot Gallery & Lightbox Boundary */}
        <ProjectScreenshotGallery
          projectTitle={project.title}
          category={project.category}
          thumbnail={project.thumbnail}
          screenshots={caseStudy?.screenshots}
        />

        {/* Case Study Content Body */}
        {caseStudy && (
          <div className="space-y-12 text-zinc-300">
            {/* Overview & Problem */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                Project Overview
              </h2>
              <p className="text-base sm:text-lg leading-relaxed text-zinc-300">
                {caseStudy.overview}
              </p>
            </section>

            <div className="border-t border-white/10 pt-8 space-y-4">
              <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                The Problem
              </h2>
              <p className="text-base sm:text-lg leading-relaxed text-zinc-300">
                {caseStudy.problem}
              </p>
            </div>

            <div className="border-t border-white/10 pt-8 space-y-4">
              <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                Technical Solution
              </h2>
              <p className="text-base sm:text-lg leading-relaxed text-zinc-300">
                {caseStudy.solution}
              </p>
            </div>

            {/* My Contribution */}
            {caseStudy.myContribution && caseStudy.myContribution.length > 0 && (
              <div className="border-t border-white/10 pt-8 space-y-4">
                <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                  My Contribution
                </h2>
                <ul className="space-y-3">
                  {caseStudy.myContribution.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-sky-400 mt-0.5" />
                      <span className="text-base sm:text-lg leading-relaxed text-zinc-300">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* System Architecture */}
            {caseStudy.architecture && caseStudy.architecture.length > 0 && (
              <div className="border-t border-white/10 pt-8 space-y-4">
                <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                  System Architecture Highlights
                </h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {caseStudy.architecture.map((arch, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl border border-white/10 bg-zinc-900/50 p-4 flex items-start gap-3"
                    >
                      <Layers className="h-5 w-5 shrink-0 text-sky-400 mt-0.5" />
                      <span className="text-sm font-medium text-zinc-200 leading-snug">
                        {arch}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key Feature Modules */}
            {caseStudy.keyFeatures && caseStudy.keyFeatures.length > 0 && (
              <div className="border-t border-white/10 pt-8 space-y-6">
                <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                  Key Features
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {caseStudy.keyFeatures.map((feat, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl border border-white/10 bg-zinc-900/60 p-5 space-y-2"
                    >
                      <h3 className="text-base font-semibold text-white">
                        {feat.title}
                      </h3>
                      <p className="text-sm text-zinc-400 leading-relaxed">
                        {feat.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Complete Technologies Used */}
            <div className="border-t border-white/10 pt-8 space-y-4">
              <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                Technologies & Dependencies
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-lg border border-white/10 bg-zinc-900 px-3 py-1.5 text-sm font-medium text-zinc-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Learnings */}
            {caseStudy.whatILearned && caseStudy.whatILearned.length > 0 && (
              <div className="border-t border-white/10 pt-8 space-y-4">
                <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                  What I Learned
                </h2>
                <ul className="space-y-2.5">
                  {caseStudy.whatILearned.map((learning, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400" />
                      <span className="text-base text-zinc-300 leading-relaxed">
                        {learning}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Previous / Next Project Navigation Bar */}
        <nav
          aria-label="Project Case Study Navigation"
          className="mt-16 border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          {prevProject ? (
            <Link
              href={`/projects/${prevProject.slug}`}
              className="group flex flex-col items-start gap-1 rounded-xl border border-white/10 bg-zinc-900/60 p-4 transition-all hover:border-sky-500/30 hover:bg-zinc-900 w-full sm:w-auto min-w-[200px]"
            >
              <span className="inline-flex items-center gap-1 text-xs font-medium text-zinc-400 group-hover:text-sky-400">
                <ArrowLeft className="h-3.5 w-3.5" /> Previous Project
              </span>
              <span className="text-sm font-semibold text-white">
                {prevProject.title}
              </span>
            </Link>
          ) : (
            <div />
          )}

          {nextProject ? (
            <Link
              href={`/projects/${nextProject.slug}`}
              className="group flex flex-col items-end text-right gap-1 rounded-xl border border-white/10 bg-zinc-900/60 p-4 transition-all hover:border-sky-500/30 hover:bg-zinc-900 w-full sm:w-auto min-w-[200px] ml-auto"
            >
              <span className="inline-flex items-center gap-1 text-xs font-medium text-zinc-400 group-hover:text-sky-400">
                Next Project <ArrowRight className="h-3.5 w-3.5" />
              </span>
              <span className="text-sm font-semibold text-white">
                {nextProject.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
        </nav>
      </Container>
    </main>
  );
}
