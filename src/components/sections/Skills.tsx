"use client";

import React from "react";
import { motion, type Variants } from "motion/react";
import { BrainCircuit, Code2, Database, Layout, Server, Wrench } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { SkillCategoryCard } from "@/components/skills/SkillCategoryCard";
import { skillsData } from "@/data/skills";
import type { SkillCategory } from "@/types";

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
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

const categoryConfig: {
  category: SkillCategory;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { category: "Languages", icon: Code2 },
  { category: "Frontend", icon: Layout },
  { category: "Backend", icon: Server },
  { category: "Database / Data", icon: Database },
  { category: "AI / LLM", icon: BrainCircuit },
  { category: "Tools", icon: Wrench },
];

export function Skills() {
  return (
    <section id="skills" className="relative border-t border-white/5 py-16 sm:py-24">
      <Container>
        <SectionHeading
          badge="TECHNICAL SKILLS"
          title="Skills & Technologies"
          subtitle="Verified technical stack organized by engineering domain expertise."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {categoryConfig.map(({ category, icon }) => {
            const categorySkills = skillsData.filter(
              (skill) => skill.category === category
            );

            return (
              <motion.div key={category} variants={itemVariants}>
                <SkillCategoryCard
                  category={category}
                  icon={icon}
                  skills={categorySkills}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
