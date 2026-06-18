import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gaw Capital Asset Intelligence Platform",
  description: "Static Next.js rewrite of the original Stream3 web app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link crossOrigin="" href="https://fonts.gstatic.com" rel="preconnect" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Montserrat:wght@300;400;500;600;700&display=block"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
