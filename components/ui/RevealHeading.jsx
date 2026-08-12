import { splitIntoWords } from "@/lib/utils/splitIntoWords";

export function RevealHeading({ text, as: Element = "h1", className }) {
  const words = splitIntoWords(text);

  return (
    <Element className={className} style={{ perspective: "600px" }}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="mr-3 inline-block overflow-hidden pb-1 align-bottom last:mr-0">
          <span className="hero-heading-word inline-block">{word}</span>
        </span>
      ))}
    </Element>
  );
}
