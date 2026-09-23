"use client";

import { motion, type Variants } from "motion/react";
import { Building2, Calendar, GraduationCap, MapPin } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { educationData } from "@/data/education";

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

export function Education() {
  return (
    <section id="education" className="relative border-t border-white/5 py-16 sm:py-24">
      <Container>
        <SectionHeading
          badge="EDUCATION"
          title="Academic Qualifications"
          subtitle="Formal computer science education and academic results."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-col gap-6 max-w-4xl"
        >
          {educationData.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className="rounded-2xl border border-white/10 bg-zinc-900/60 p-6 sm:p-8 backdrop-blur-sm shadow-xl"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white sm:text-2xl">
                    {item.degree}
                  </h3>
                  {item.institution && (
                    <div className="mt-2 flex flex-wrap items-center gap-4 text-sm font-medium text-sky-400">
                      <span className="flex items-center gap-1.5">
                        <Building2 className="h-4 w-4 shrink-0" />
                        {item.institution}
                      </span>
                      {item.location && (
                        <span className="flex items-center gap-1.5 text-zinc-400">
                          <MapPin className="h-4 w-4 shrink-0" />
                          {item.location}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-2.5 self-start sm:self-auto shrink-0">
                  {item.period && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-500/20 bg-sky-500/10 px-3.5 py-1 text-xs font-medium text-sky-400">
                      <Calendar className="h-3.5 w-3.5 shrink-0" />
                      {item.period}
                    </span>
                  )}
                  {item.grade && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-500/20 bg-sky-500/10 px-3.5 py-1 text-xs font-mono font-medium text-sky-400">
                      <GraduationCap className="h-3.5 w-3.5 shrink-0" />
                      {item.grade}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
