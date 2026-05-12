import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GlobalShortcuts from "@/components/GlobalShortcuts"; 
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "DSA Notes Navigator",
    template: "%s · DSA Notes Navigator",
  },
  description:
    "A GitHub-style markdown navigator for structured DSA notes with sidebar, TOC, keyboard shortcuts, and dry-run canvas.",
  icons: {
    icon: "/icon.svg",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        <script
          dangerouslySetInnerHTML={{
            __html: `
      (function () {
        try {
          const stored = localStorage.getItem("ui.theme");
          const theme =
            stored === "dark" || stored === "light"
              ? stored
              : (window.matchMedia("(prefers-color-scheme: dark)").matches
                  ? "dark"
                  : "light");
          document.documentElement.dataset.theme = theme;
        } catch {}
      })();
    `,
          }}
        />
        <GlobalShortcuts />
        {children}
      </body>
    </html>
  );
}
