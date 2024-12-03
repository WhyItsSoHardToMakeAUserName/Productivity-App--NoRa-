import type { Metadata } from "next";
import "./globals.css";
import { fredoka } from "@/components/ui";

export const metadata: Metadata = {
  title: "NoRa",
  description: "All in one productivity app",
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body className={`${fredoka.className}`}>
        {children}
      </body>
    </html>
  );
}
