import React from "react";
import type { Skill, SkillCategory } from "@/types";

export type SkillCategoryCardProps = {
  category: SkillCategory;
  icon: React.ComponentType<{ className?: string }>;
  skills: Skill[];
};

export function SkillCategoryCard({
  category,
  icon: Icon,
  skills,
}: SkillCategoryCardProps) {
  return (
    <div className="flex flex-col justify-between rounded-xl border border-white/10 bg-zinc-900/60 p-5 backdrop-blur-sm shadow-lg transition-colors hover:border-white/20">
      <div>
        {/* Card Header: Category Icon, Title & Tech Count */}
        <div className="flex items-center gap-3 border-b border-white/5 pb-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-sky-500/20 bg-sky-500/10 text-sky-400">
            <Icon className="h-4 w-4" />
          </div>
          <h3 className="text-base font-semibold text-zinc-100 sm:text-lg">
            {category}
          </h3>
          <span className="ml-auto rounded-full border border-white/5 bg-zinc-800/80 px-2.5 py-0.5 text-xs font-medium text-zinc-400">
            {skills.length} {skills.length === 1 ? "tech" : "techs"}
          </span>
        </div>

        {/* Skill Chips List */}
        <div className="mt-4 flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill.name}
              className="rounded-md border border-white/10 bg-zinc-800/50 px-2.5 py-1 text-xs font-medium text-zinc-200 transition-colors hover:border-sky-500/30 hover:bg-sky-500/10 hover:text-sky-300"
            >
              {skill.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
