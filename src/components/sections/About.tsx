"use client";

import { motion, type Variants } from "motion/react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/layout/SectionHeading";

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
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const coreFocusGroups = [
  {
    category: "Backend",
    techs: ["Python", "Django", "Django REST Framework", "FastAPI", "REST APIs"],
  },
  {
    category: "Frontend",
    techs: ["React.js", "Next.js", "JavaScript", "Tailwind CSS", "Bootstrap"],
  },
  {
    category: "Database & Data",
    techs: ["MySQL", "SQLAlchemy", "Django ORM", "PyMySQL"],
  },
  {
    category: "AI & LLM Integration",
    techs: ["Groq", "LangChain", "LangGraph"],
  },
  {
    category: "Validation & Processing",
    techs: ["Pydantic", "PyPDF", "Axios", "Git"],
  },
];

export function About() {
  return (
    <section id="about" className="relative border-t border-white/5 py-16 sm:py-24">
      <Container>
        <SectionHeading
          badge="ABOUT ME"
          title="Python Full Stack Developer with an API & Database Focus"
          subtitle="Engineering robust web applications, structured RESTful backends, and responsive React interfaces."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-10 lg:grid-cols-12 lg:gap-12"
        >
          {/* Left Column: Professional Narrative */}
          <div className="flex flex-col gap-5 text-base text-zinc-300 lg:col-span-7">
            <motion.p variants={itemVariants} className="leading-relaxed">
              I am a <strong className="text-white font-semibold">Python Full Stack Developer</strong> specializing in designing and implementing web applications using Python, Django, React.js, REST APIs, and MySQL. My engineering approach focuses on architectural clarity, database integrity, and clean separation between backend service layers and frontend interfaces.
            </motion.p>

            <motion.p variants={itemVariants} className="leading-relaxed text-zinc-400">
              My technical experience spans building end-to-end full-stack systems—from crafting normalized MySQL database schemas and Django ORM models to developing modular React frontend components powered by RESTful endpoints and state management.
            </motion.p>

            <motion.p variants={itemVariants} className="leading-relaxed text-zinc-400">
              Additionally, I have hands-on experience integrating AI and Large Language Model (LLM) capabilities using <strong className="text-zinc-200">Groq, LangChain, and LangGraph</strong> within a FastAPI-based pharmaceutical Quality Management System, automating complex document handling and workflow graph processing.
            </motion.p>
          </div>

          {/* Right Column: Grouped Core Focus */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col gap-5 rounded-2xl border border-white/10 bg-zinc-900/50 p-6 backdrop-blur-sm lg:col-span-5"
          >
            <h3 className="text-xs font-semibold uppercase tracking-wider text-sky-400">
              Core Technical Focus
            </h3>

            <div className="flex flex-col gap-4">
              {coreFocusGroups.map((group) => (
                <div key={group.category} className="space-y-1.5">
                  <span className="text-xs font-medium text-zinc-400">
                    {group.category}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {group.techs.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-white/5 bg-zinc-800/60 px-2.5 py-1 text-xs font-medium text-zinc-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
