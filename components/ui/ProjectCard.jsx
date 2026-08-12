"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowUpRight, Github } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap/gsapConfig";
import { Badge } from "@/components/ui/Badge";

export function ProjectCard({ project, index }) {
  const cardRef = useRef(null);

  const { contextSafe } = useGSAP({ scope: cardRef });

  const handleEnter = contextSafe(() => {
    gsap.to(cardRef.current, {
      y: -8,
      boxShadow: "0 0 0 1px rgba(245, 166, 35, 0.4), 0 20px 40px -20px rgba(245, 166, 35, 0.35)",
      duration: 0.4,
      ease: "power3.out"
    });
  });

  const handleLeave = contextSafe(() => {
    gsap.to(cardRef.current, {
      y: 0,
      boxShadow: "0 0 0 1px rgba(232, 236, 244, 0.06), 0 0px 0px 0px rgba(0,0,0,0)",
      duration: 0.4,
      ease: "power3.out"
    });
  });

  return (
    <article
      ref={cardRef}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="project-card group flex flex-col overflow-hidden rounded-2xl border border-ink-600 bg-ink-800"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-ink-600 bg-ink-700">
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-ink-900/80 px-3 py-1 font-mono text-xs text-signal-400">
          PRJ-{String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <h3 className="font-display text-xl text-ink-100">{project.title}</h3>
        <p className="flex-1 font-body text-sm text-ink-300">{project.description}</p>

        <div className="flex flex-wrap gap-2">
          {project.tags?.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>

        <div className="flex items-center gap-4 pt-2 font-mono text-xs uppercase tracking-wide">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-wire-400 hover:text-wire-500"
            >
              Live <ArrowUpRight size={14} />
            </a>
          ) : null}
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-ink-200 hover:text-signal-400"
            >
              Code <Github size={14} />
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
