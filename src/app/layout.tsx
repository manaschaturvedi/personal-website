import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Layout from "@/components/layout/Layout";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Manas - Engineer & Developer",
  description: "I'm an engineer from India who loves creating things. Building systems from scratch and working across the stack.",
  keywords: ["engineer", "developer", "systems", "technology", "startup"],
  authors: [{ name: "Manas" }],
  creator: "Manas",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://manasch.xyz",
    title: "Manas - Engineer & Developer",
    description: "I'm an engineer from India who loves creating things. Building systems from scratch and working across the stack.",
    siteName: "Manas",
  },
  twitter: {
    card: "summary",
    title: "Manas - Engineer & Developer",
    description: "I'm an engineer from India who loves creating things. Building systems from scratch and working across the stack.",
    creator: "@manas",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased">
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  );
}
