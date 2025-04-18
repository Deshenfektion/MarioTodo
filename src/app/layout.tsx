import type { Metadata } from "next";
import "./globals.css";
import { oswald } from "@/app/ui/fonts";
import { anton } from "@/app/ui/fonts";
import Image from "next/image";
import Link from "next/link";
import MarioBackground from "./ui/mario-background/mario-background";

export const metadata: Metadata = {
  title: "MyTodo",
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
          <MarioBackground />
          {children}
        </body>
      </html>
    </>
  );
}
