import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CareerAI — AI-Powered Student Placement Platform",
  description: "Unify your placement preparation with AI-powered skill matching, resume tailoring, company-specific quiz generation, and curated learning paths.",
  keywords: ["placement", "career", "AI", "resume", "interview prep", "skill gap analysis"],
  openGraph: {
    title: "CareerAI — AI-Powered Student Placement Platform",
    description: "Ace your campus placements with AI-driven skill gap analysis, resume optimization, and targeted interview preparation.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
