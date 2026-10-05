import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rate My Class",
  description: "Class rating's in SDSU",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-screen w-screen antialiased bg-(--bg-primary) text-(--text-primary) max-w-screen px-20.5`}
    >
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
