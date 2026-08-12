export function SectionCard({ title, description, children }) {
  return (
    <div className="flex flex-col gap-6 rounded-2xl border border-ink-600 bg-ink-800 p-6 sm:p-8">
      <div>
        <h2 className="font-display text-xl text-ink-100">{title}</h2>
        {description ? (
          <p className="mt-1 font-body text-sm text-ink-300">{description}</p>
        ) : null}
      </div>
      {children}
    </div>
  );
}
