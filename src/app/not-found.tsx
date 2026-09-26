import Link from "next/link";
import { ArrowLeft, ArrowDown } from "lucide-react";
import { Container } from "@/components/layout/Container";

export default function NotFound() {
  return (
    <main className="flex min-h-[80vh] flex-col items-center justify-center py-16 sm:py-24">
      <Container className="max-w-2xl text-center">
        {/* Eyebrow badge */}
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/10 px-3.5 py-1 text-xs font-semibold tracking-wider text-sky-400 uppercase">
          <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
          404 ERROR
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
          Page Not Found
        </h1>

        {/* Description */}
        <p className="mt-4 text-base text-zinc-400 sm:text-lg sm:leading-relaxed">
          The page or case study you are looking for does not exist, has been removed, or the link may be invalid.
        </p>

        {/* Action CTAs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-sky-500 px-6 text-sm font-semibold text-zinc-950 transition-all hover:bg-sky-400 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Portfolio
          </Link>

          <Link
            href="/#projects"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/10 bg-zinc-900/80 px-6 text-sm font-medium text-zinc-200 transition-all hover:border-white/20 hover:bg-zinc-800 hover:text-white hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
          >
            View Projects
            <ArrowDown className="h-4 w-4 text-zinc-400" />
          </Link>
        </div>
      </Container>
    </main>
  );
}
