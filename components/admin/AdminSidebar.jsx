import { cn } from "@/lib/utils/cn";

export const adminSections = [
  { key: "profile", label: "Profile" },
  { key: "contact", label: "Contact & Social" },
  { key: "skills", label: "Skills" },
  { key: "projects", label: "Projects" },
  { key: "experience", label: "Experience" },
  { key: "education", label: "Education" },
  { key: "achievements", label: "Achievements" }
];

export function AdminSidebar({ activeSection, onSelectSection }) {
  return (
    <nav className="flex gap-2 overflow-x-auto border-b border-ink-700 pb-4 lg:w-56 lg:flex-col lg:border-b-0 lg:border-r lg:pb-0 lg:pr-6">
      {adminSections.map((section) => (
        <button
          key={section.key}
          type="button"
          onClick={() => onSelectSection(section.key)}
          className={cn(
            "whitespace-nowrap rounded-lg px-4 py-2 text-left font-mono text-xs uppercase tracking-wide transition-colors",
            activeSection === section.key
              ? "bg-signal-500/10 text-signal-400"
              : "text-ink-300 hover:bg-ink-800 hover:text-ink-100"
          )}
        >
          {section.label}
        </button>
      ))}
    </nav>
  );
}
