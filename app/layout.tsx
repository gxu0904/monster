import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Grace Xu | Retro Computer Portfolio",
  description: "Full-stack developer and product designer building tools that make learning and productivity more accessible. Experience my work through a nostalgic late-90s desktop interface.",
  keywords: ["Grace Xu", "portfolio", "web developer", "full-stack", "TypeScript", "React", "Next.js"],
  authors: [{ name: "Grace Xu" }],
  openGraph: {
    title: "Grace Xu | Retro Computer Portfolio",
    description: "Full-stack developer and product designer. Explore my projects through a nostalgic late-90s desktop experience.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Grace Xu | Retro Computer Portfolio",
    description: "Full-stack developer and product designer. Explore my projects through a nostalgic late-90s desktop experience.",
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  themeColor: "#c0c0c0",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
