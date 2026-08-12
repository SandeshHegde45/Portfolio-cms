"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Mail, Phone, MapPin, Download } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap/gsapConfig";
import { useRevealOnScroll } from "@/lib/hooks/useRevealOnScroll";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { SocialLinks } from "@/components/ui/SocialLinks";

export function ContactSection({ profile, contact }) {
  const sectionRef = useRef(null);
  const submitButtonRef = useRef(null);
  const [submissionState, setSubmissionState] = useState("idle");

  useRevealOnScroll(sectionRef, ".contact-reveal", { stagger: 0.12 });

  const { contextSafe } = useGSAP({ scope: sectionRef });

  const pulseSubmitButton = contextSafe(() => {
    gsap.to(submitButtonRef.current, {
      scale: 1.06,
      duration: 0.2,
      ease: "power2.out",
      yoyo: true,
      repeat: 1
    });
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: { name: "", email: "", message: "" }
  });

  const onSubmit = (values) => {
    pulseSubmitButton();
    const subject = encodeURIComponent(`Portfolio inquiry from ${values.name}`);
    const body = encodeURIComponent(`${values.message}\n\nFrom: ${values.name} (${values.email})`);
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
    setSubmissionState("sent");
    reset();
  };

  return (
    <section id="contact" ref={sectionRef} className="border-t border-ink-800 py-28">
      <Container>
        <SectionHeading
          index="07"
          title="Contact"
          description="Have a role, project, or idea in mind? Reach out below."
        />

        <div className="grid gap-12 lg:grid-cols-[280px_minmax(0,1fr)]">
          <div className="contact-reveal flex flex-col gap-6">
            <div className="flex items-center gap-3 font-body text-sm text-ink-200">
              <Mail size={16} className="text-signal-400" />
              <a href={`mailto:${contact.email}`} className="hover:text-signal-400">
                {contact.email}
              </a>
            </div>
            {contact.phone ? (
              <div className="flex items-center gap-3 font-body text-sm text-ink-200">
                <Phone size={16} className="text-signal-400" />
                <span>{contact.phone}</span>
              </div>
            ) : null}
            <div className="flex items-center gap-3 font-body text-sm text-ink-200">
              <MapPin size={16} className="text-signal-400" />
              <span>{profile.location}</span>
            </div>

            <SocialLinks contact={contact} className="pt-2" />

            <Button
              as="a"
              href={contact.resumeUrl}
              target="_blank"
              rel="noreferrer"
              variant="outline"
              className="mt-4 w-fit"
            >
              Download resume <Download size={15} />
            </Button>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="contact-reveal flex flex-col gap-5 rounded-2xl border border-ink-600 bg-ink-800 p-8"
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="font-mono text-xs uppercase tracking-wide text-ink-400">
                Name
              </label>
              <input
                id="name"
                type="text"
                className="rounded-lg border border-ink-600 bg-ink-900 px-4 py-3 font-body text-sm text-ink-100 outline-none transition-colors focus:border-signal-400"
                {...register("name", { required: "Please share your name." })}
              />
              {errors.name ? (
                <span className="font-mono text-xs text-signal-500">{errors.name.message}</span>
              ) : null}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-mono text-xs uppercase tracking-wide text-ink-400">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="rounded-lg border border-ink-600 bg-ink-900 px-4 py-3 font-body text-sm text-ink-100 outline-none transition-colors focus:border-signal-400"
                {...register("email", {
                  required: "Please share an email.",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address."
                  }
                })}
              />
              {errors.email ? (
                <span className="font-mono text-xs text-signal-500">{errors.email.message}</span>
              ) : null}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="font-mono text-xs uppercase tracking-wide text-ink-400">
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                className="resize-none rounded-lg border border-ink-600 bg-ink-900 px-4 py-3 font-body text-sm text-ink-100 outline-none transition-colors focus:border-signal-400"
                {...register("message", { required: "Let me know what you have in mind." })}
              />
              {errors.message ? (
                <span className="font-mono text-xs text-signal-500">{errors.message.message}</span>
              ) : null}
            </div>

            <div className="flex items-center gap-4 pt-2">
              <Button ref={submitButtonRef} type="submit" variant="primary" disabled={isSubmitting}>
                Send message
              </Button>
              {submissionState === "sent" ? (
                <span className="font-mono text-xs text-wire-400">Opening your mail client…</span>
              ) : null}
            </div>
          </form>
        </div>
      </Container>
    </section>
  );
}
