import type { Metadata } from "next";
import "./globals.css";
import { oswald } from "@/app/ui/fonts";
import { anton } from "@/app/ui/fonts";
import Image from "next/image";
import Link from "next/link";
import MarioBackground from "./ui/mario-background/mario-background";

export const metadata: Metadata = {
  title: "MarioTodo",
  description: "Todo List with Mario UI from Hyperplexity",
  icons: {
    icon: "/M.png",
    shortcut: "/M.png",
    apple: "/M.png",
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
        <body className="text-4xl">
          <div id="MarioBackground">
            <MarioBackground />
          </div>
          {children}
        </body>
      </html>
    </>
  );
}
