"use client";

import { useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { sectionNavItems } from "@/lib/constants/navigation";
import { useNavEntrance } from "@/lib/hooks/useNavEntrance";
import { useScrollSpy } from "@/lib/hooks/useScrollSpy";
import { useHoverAnimation } from "@/lib/hooks/useHoverAnimation";
import { Container } from "@/components/ui/Container";
import { NavLink } from "@/components/layout/NavLink";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

export function SiteNavbar({ profileName }) {
  const navRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useNavEntrance(navRef);
  const activeHref = useScrollSpy(sectionNavItems);

  const logoHover = useHoverAnimation({ scale: 1.04 });

  return (
    <header
      ref={navRef}
      className="fixed inset-x-0 top-0 z-40 border-b border-ink-700/80 bg-ink-900/80 backdrop-blur"
    >
      <Container className="flex h-16 items-center justify-between">
        <a
          ref={logoHover.elementRef}
          onMouseEnter={logoHover.onMouseEnter}
          onMouseLeave={logoHover.onMouseLeave}
          href="#top"
          className="nav-item font-display text-sm tracking-wide text-ink-100"
        >
          {profileName || "Portfolio"}
        </a>

        <nav className="hidden items-center gap-6 md:flex">
          {sectionNavItems.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              index={item.index}
              label={item.label}
              isActive={activeHref === item.href}
            />
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle className="nav-item flex h-9 w-9 items-center justify-center rounded-full border border-ink-500 text-ink-100 transition-colors duration-300 hover:border-signal-400 hover:text-signal-400" />

          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="nav-item flex h-9 w-9 items-center justify-center rounded-full border border-ink-500 text-ink-100 md:hidden"
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </Container>

      {isMenuOpen ? (
        <nav className="flex flex-col gap-1 border-t border-ink-700 bg-ink-900 px-6 py-4 md:hidden">
          {sectionNavItems.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              index={item.index}
              label={item.label}
              isActive={activeHref === item.href}
              onClick={() => setIsMenuOpen(false)}
              className="rounded-lg px-2 py-2 hover:bg-ink-800"
            />
          ))}
        </nav>
      ) : null}
    </header>
  );
}