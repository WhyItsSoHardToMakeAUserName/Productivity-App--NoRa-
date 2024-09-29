import type { Metadata } from "next";
import "./globals.css";
import { fredoka } from "@/components/ui";

export const metadata: Metadata = {
  title: "NoRa",
  description: "All in one productivity app",
};

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body className={`max-h-screen overflow-hidden ${fredoka.className}`}>
        {children}
      </body>
    </html>
  );
}
