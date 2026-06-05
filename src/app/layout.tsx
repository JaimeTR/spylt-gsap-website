import type { Metadata } from "next";
import { Space_Grotesk, Poppins } from "next/font/google";
import "./globals.css";

const space = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jaime Tarazona - Full Stack & AI Developer",
  description: "Portfolio premium de Jaime Tarazona, Full Stack Developer, WordPress Expert y AI Automation Specialist.",
  openGraph: {
    title: "Jaime Tarazona - Portfolio",
    description: "Explora mis proyectos en desarrollo web, SaaS, automatizaciones e IA.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jaime Tarazona - Portfolio",
    description: "Explora mis proyectos en desarrollo web, SaaS, automatizaciones e IA.",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${poppins.variable} ${space.variable} font-sans bg-background text-foreground antialiased selection:bg-accent selection:text-white`}>
        {children}
      </body>
    </html>
  );
}
