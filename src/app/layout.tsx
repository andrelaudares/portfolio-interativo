import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "André Laudares - Portfólio Interativo",
  description: "Desenvolvedor especializado em IA, Python Backend e automação. Technical Product Manager na Altivus AI.",
  keywords: ["André Laudares", "Python", "FastAPI", "IA", "Backend", "Desenvolvedor", "Engenharia de Software"],
  authors: [{ name: "André Laudares Soares" }],
  openGraph: {
    title: "André Laudares - Portfólio Interativo",
    description: "Desenvolvedor especializado em IA, Python Backend e automação",
    url: "https://portfolio-andre-laudares.vercel.app",
    siteName: "André Laudares Portfolio",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={`${inter.className} bg-background text-foreground antialiased`}>
        <div className="min-h-screen">
        {children}
        </div>
      </body>
    </html>
  );
}
