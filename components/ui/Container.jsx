import { cn } from "@/lib/utils/cn";

export function Container({ as: Element = "div", className, children }) {
  return (
    <Element className={cn("mx-auto w-full max-w-6xl px-6 sm:px-8", className)}>
      {children}
    </Element>
  );
}
