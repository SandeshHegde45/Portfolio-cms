import { Container } from "@/components/ui/Container";

export function SiteFooter({ profileName }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-ink-700 bg-ink-900 py-10">
      <Container className="flex flex-col items-center justify-between gap-4 text-center font-mono text-xs text-ink-400 sm:flex-row sm:text-left">
        <p>
          © {currentYear} {profileName || "Portfolio"}. All rights reserved.
        </p>
        <a href="/admin" className="text-ink-500 transition-colors hover:text-signal-400">
          Manage content
        </a>
      </Container>
    </footer>
  );
}
