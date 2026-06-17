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
      <body>{children}</body>
    </html>
  );
}
