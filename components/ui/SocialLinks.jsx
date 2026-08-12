import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { useHoverAnimation } from "@/lib/hooks/useHoverAnimation";

const socialLinkConfig = [
  { id: "github", label: "GitHub", icon: Github },
  { id: "linkedin", label: "LinkedIn", icon: Linkedin },
  { id: "twitter", label: "Twitter", icon: Twitter },
  { id: "email", label: "Email", icon: Mail }
];

function SocialLinkIcon({ label, icon: Icon, href, isEmail }) {
  const { elementRef, onMouseEnter, onMouseLeave } = useHoverAnimation({
    scale: 1.15,
    y: -3
  });

  return (
    <a
      ref={elementRef}
      href={href}
      target={isEmail ? undefined : "_blank"}
      rel={isEmail ? undefined : "noreferrer"}
      aria-label={label}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-500 text-ink-200 transition-colors duration-300 hover:border-signal-400 hover:text-signal-400"
    >
      <Icon size={16} />
    </a>
  );
}

export function SocialLinks({ contact, className }) {
  const links = socialLinkConfig
    .map(({ id, label, icon }) => {
      const href = id === "email" ? `mailto:${contact?.email}` : contact?.[id];
      if (!href) return null;
      return { id, label, icon, href, isEmail: id === "email" };
    })
    .filter(Boolean);

  return (
    <div className={cn("flex items-center gap-3", className)}>
      {links.map(({ id, ...linkProps }) => (
        <SocialLinkIcon key={id} {...linkProps} />
      ))}
    </div>
  );
}