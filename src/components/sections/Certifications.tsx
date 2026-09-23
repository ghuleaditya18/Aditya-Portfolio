"use client";

import { useState } from "react";
import { motion, type Variants } from "motion/react";
import { Award, BookOpen, Building2, ExternalLink, Eye, FileText } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { CertificateLightbox } from "@/components/certifications/CertificateLightbox";
import { certificationsData, publicationData } from "@/data/certifications";
import type { Certification } from "@/types";

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

export function Certifications() {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  return (
    <>
      <section id="certifications" className="relative border-t border-white/5 py-16 sm:py-24">
        <Container>
          <SectionHeading
            badge="CERTIFICATIONS & PUBLICATION"
            title="Certifications & Research"
            subtitle="Professional certifications and published engineering research."
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="flex flex-col gap-10"
          >
            {/* Subsection 1: Professional Certifications */}
            <div className="space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-sky-400">
                Professional Certifications
              </h3>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {certificationsData.map((item) => (
                  <motion.div
                    key={item.id}
                    variants={itemVariants}
                    className="flex flex-col justify-between gap-5 rounded-2xl border border-white/10 bg-zinc-900/60 p-6 sm:p-8 backdrop-blur-sm shadow-xl transition-all hover:border-white/20"
                  >
                    <div className="flex items-start gap-4">
                      <div className="rounded-lg border border-sky-500/20 bg-sky-500/10 p-2.5 text-sky-400 shrink-0">
                        <Award className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-white sm:text-xl leading-snug">
                          {item.title}
                        </h4>
                        <div className="mt-2 flex items-center gap-1.5 text-sm font-medium text-zinc-400">
                          <Building2 className="h-4 w-4 shrink-0 text-sky-400" />
                          <span>{item.issuer}</span>
                        </div>
                      </div>
                    </div>

                    {item.issueDate && (
                      <div className="text-xs font-mono text-zinc-500 border-t border-white/5 pt-3">
                        Issued: {item.issueDate}
                      </div>
                    )}

                    {item.image && (
                      <div className="border-t border-white/5 pt-4">
                        <button
                          type="button"
                          onClick={() => setSelectedCert(item)}
                          aria-label={`View ${item.title} certificate`}
                          className="inline-flex items-center gap-2 rounded-lg border border-sky-500/20 bg-sky-500/10 px-3.5 py-2 text-xs font-medium text-sky-400 transition-all hover:bg-sky-500/20 hover:border-sky-500/30 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                        >
                          <Eye className="h-3.5 w-3.5 shrink-0" />
                          <span>View Certificate</span>
                        </button>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Subsection 2: Publication & Research */}
            <div className="space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-sky-400">
                Publication & Research
              </h3>
              <div className="max-w-4xl">
                {publicationData.map((pub) => (
                  <motion.div
                    key={pub.id}
                    variants={itemVariants}
                    className="flex flex-col gap-5 rounded-2xl border border-white/10 bg-zinc-900/60 p-6 sm:p-8 backdrop-blur-sm shadow-xl transition-all hover:border-white/20"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="rounded-lg border border-sky-500/20 bg-sky-500/10 p-2.5 text-sky-400 shrink-0">
                          <BookOpen className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-bold text-white sm:text-xl leading-snug">
                            {pub.title}
                          </h4>
                          {pub.publisher && (
                            <div className="mt-2 text-sm font-medium text-zinc-400">
                              {pub.publisher}
                            </div>
                          )}
                        </div>
                      </div>

                      <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-500/20 bg-sky-500/10 px-3.5 py-1 text-xs font-mono font-medium text-sky-400 self-start sm:self-auto shrink-0">
                        <FileText className="h-3.5 w-3.5 shrink-0" />
                        {pub.type}
                      </span>
                    </div>

                    {pub.documentUrl && (
                      <div className="border-t border-white/5 pt-4">
                        <a
                          href={pub.documentUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`View Research Paper: ${pub.title} (opens in a new tab)`}
                          className="inline-flex items-center gap-2 rounded-lg border border-sky-500/20 bg-sky-500/10 px-3.5 py-2 text-xs font-medium text-sky-400 transition-all hover:bg-sky-500/20 hover:border-sky-500/30 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                        >
                          <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                          <span>View Research Paper</span>
                        </a>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Certificate Lightbox Viewer */}
      <CertificateLightbox
        certification={selectedCert}
        onClose={() => setSelectedCert(null)}
      />
    </>
  );
}
