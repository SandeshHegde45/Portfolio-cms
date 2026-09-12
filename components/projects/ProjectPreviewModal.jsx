"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { X, ArrowUpRight, Github, ArrowRight } from "lucide-react";
import { useModalAnimation } from "@/lib/hooks/useModalAnimation";
import { useHoverAnimation } from "@/lib/hooks/useHoverAnimation";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export function ProjectPreviewModal({ project, index }) {
  const backdropRef = useRef(null);
  const panelRef = useRef(null);

  const { closeWithAnimation } = useModalAnimation(backdropRef, panelRef);
  const closeButtonHover = useHoverAnimation({ scale: 1.1 });

  const closeRef = useRef(closeWithAnimation);
  closeRef.current = closeWithAnimation;

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeRef.current();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div
      ref={backdropRef}
      onClick={closeWithAnimation}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-ink-950/80 p-4 backdrop-blur-sm sm:p-8"
    >
      <div
        ref={panelRef}
        onClick={(event) => event.stopPropagation()}
        className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-ink-600 bg-ink-900 shadow-2xl"
      >
        <button
          ref={closeButtonHover.elementRef}
          onMouseEnter={closeButtonHover.onMouseEnter}
          onMouseLeave={closeButtonHover.onMouseLeave}
          type="button"
          onClick={closeWithAnimation}
          aria-label="Close preview"
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-ink-500 bg-ink-900/80 text-ink-100 backdrop-blur transition-colors duration-300 hover:border-signal-400 hover:text-signal-400"
        >
          <X size={16} />
        </button>

        <div className="relative aspect-[21/9] w-full overflow-hidden border-b border-ink-600 bg-ink-700">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            priority
            sizes="(min-width: 1024px) 896px, 100vw"
            className="object-cover"
          />
          <span className="absolute left-5 top-5 rounded-full bg-ink-900/80 px-3 py-1 font-mono text-xs text-signal-400">
            PRJ-{String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <div className="flex flex-col gap-5 p-6 sm:p-8">
          <h2 className="modal-reveal font-display text-2xl text-ink-50 sm:text-3xl">
            {project.title}
          </h2>

          <div className="modal-reveal flex flex-wrap gap-2">
            {project.tags?.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>

          <p className="modal-reveal font-body text-sm text-ink-300 sm:text-base">
            {project.description}
          </p>

          <div className="modal-reveal flex flex-wrap items-center gap-4 pt-2">
            {project.liveUrl ? (
              <Button as="a" href={project.liveUrl} target="_blank" rel="noreferrer" variant="primary">
                View live <ArrowUpRight size={15} />
              </Button>
            ) : null}
            {project.githubUrl ? (
              <Button as="a" href={project.githubUrl} target="_blank" rel="noreferrer" variant="outline">
                Source code <Github size={15} />
              </Button>
            ) : null}
            <a
              href={`/projects/${project.id}`}
              className="inline-flex items-center gap-1 font-mono text-xs uppercase tracking-wide text-ink-400 transition-colors duration-300 hover:text-signal-400"
            >
              Full case study <ArrowRight size={13} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}