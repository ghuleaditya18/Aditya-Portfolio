"use client";

import { motion, type Variants } from "motion/react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { projectsData } from "@/data/projects";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export function Projects() {
  return (
    <section id="projects" className="relative border-t border-white/5 py-16 sm:py-24">
      <Container>
        <SectionHeading
          badge="FEATURED PROJECTS"
          title="Featured Engineering Projects"
          subtitle="Full-stack web applications and AI workflows built with Python, Django, FastAPI, and React."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8"
        >
          {projectsData.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
