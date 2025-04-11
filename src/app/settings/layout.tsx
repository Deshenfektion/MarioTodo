import "@/app/globals.css";
import Link from "next/link";
import type { ReactNode } from "react";

export default function SettingsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <header className="mb-4 text-lg font-bold flex flex-row justify-between">
        <div>⚙️ Einstellungen</div>
        <div>
          <button>
            <Link href="/">Zurück</Link>
          </button>
        </div>
      </header>
      <main>{children}</main>
    </>
  );
}
