import { Space_Grotesk, IBM_Plex_Sans, JetBrains_Mono } from "next/font/google";
import "@/app/globals.css";
import { siteConfig } from "@/lib/constants/siteConfig";
import { ThemeProvider } from "@/lib/theme/ThemeProvider";

const displayFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});

const bodyFont = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
});

const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem("portfolio-theme");
    var theme =
      stored === "light" || stored === "dark"
        ? stored
        : window.matchMedia("(prefers-color-scheme: light)").matches
        ? "light"
        : "dark";
    document.documentElement.classList.add(theme);
  } catch (error) {
    document.documentElement.classList.add("dark");
  }
})();
`;

export default function RootLayout({ children, modal }) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`}
    >
      <body className="bg-ink-900 font-body text-ink-100 antialiased">
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <ThemeProvider>
          {children}
          {modal}
        </ThemeProvider>
      </body>
    </html>
  );
}
