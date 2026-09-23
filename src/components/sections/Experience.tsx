"use client";

import { motion, type Variants } from "motion/react";
import { Building2, Calendar, MapPin } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { experienceData } from "@/data/experience";

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

const keyContributions = [
  "Built reusable Python, Django backend logic and React.js frontend components for full-stack application modules.",
  "Integrated dynamic React interfaces with secure Django REST Framework API endpoints.",
  "Applied MySQL query optimization and indexing strategies to maintain database efficiency.",
  "Developed Python automation scripts for data transformation, validation, and batch file processing.",
];

export function Experience() {
  return (
    <section id="experience" className="relative border-t border-white/5 py-16 sm:py-24">
      <Container>
        <SectionHeading
          badge="WORK EXPERIENCE"
          title="Practical Engineering Experience"
          subtitle="Professional internship training and full-stack project development."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col gap-6 max-w-4xl"
        >
          {experienceData.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className="rounded-2xl border border-white/10 bg-zinc-900/60 p-6 sm:p-8 backdrop-blur-sm shadow-xl"
            >
              {/* Header: Role & Period */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between border-b border-white/10 pb-5">
                <div>
                  <h3 className="text-xl font-bold text-white sm:text-2xl">
                    {item.role}
                  </h3>
                  <div className="mt-1.5 flex flex-wrap items-center gap-4 text-sm font-medium text-sky-400">
                    <span className="flex items-center gap-1.5">
                      <Building2 className="h-4 w-4" />
                      {item.company}
                    </span>
                    {item.location && (
                      <span className="flex items-center gap-1.5 text-zinc-400">
                        <MapPin className="h-4 w-4" />
                        {item.location}
                      </span>
                    )}
                  </div>
                </div>

                <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-500/20 bg-sky-500/10 px-3.5 py-1 text-xs font-medium text-sky-400 self-start sm:self-auto">
                  <Calendar className="h-3.5 w-3.5" />
                  {item.period}
                </span>
              </div>

              {/* Summary Description */}
              {item.description && (
                <p className="mt-5 text-sm text-zinc-300 sm:text-base leading-relaxed">
                  {item.description}
                </p>
              )}

              {/* Key Contributions */}
              <div className="mt-5 space-y-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Key Contributions & Technical Work:
                </h4>
                <ul className="space-y-2 text-sm text-zinc-300">
                  {keyContributions.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400" />
                      <span className="leading-relaxed">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technology Tags */}
              {item.technologies && item.technologies.length > 0 && (
                <div className="mt-6 border-t border-white/5 pt-4 flex flex-wrap items-center gap-2">
                  <span className="mr-2 text-xs font-medium uppercase tracking-wider text-zinc-500">
                    Technologies Used:
                  </span>
                  {item.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-white/5 bg-zinc-800/80 px-2.5 py-1 text-xs font-medium text-zinc-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
