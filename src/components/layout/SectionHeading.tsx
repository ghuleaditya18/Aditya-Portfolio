import React from "react";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  badge,
  title,
  subtitle,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-12 flex flex-col gap-3",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {badge && (
        <span className="inline-flex items-center rounded-full bg-sky-500/10 px-3 py-1 text-xs font-medium text-sky-400 ring-1 ring-inset ring-sky-500/20">
          {badge}
        </span>
      )}
      <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="max-w-2xl text-base text-zinc-400 sm:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}
