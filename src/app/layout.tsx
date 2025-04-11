import type { Metadata } from "next";
import "./globals.css";
import { oswald } from "@/app/ui/fonts";
import { anton } from "@/app/ui/fonts";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "To-Do List",
  description: "Simple To-Do List with Next.js and Supabase",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en">
        <body className={`${oswald.className} text-4xl antialiased`}>
          {children}
        </body>
      </html>
    </>
  );
}
