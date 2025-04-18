"use client";

import { useEffect } from "react";
import Image from "next/image";
import { supabase } from "./lib/supabaseClient"; // Dein Supabase-Client
import TasksPage from "./tasks";

export default function Page() {
  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        window.location.href = "/login"; // Weiterleitung zur Login-Seite, wenn der Benutzer nicht eingeloggt ist
      }
    };

    checkUser();
  }, []);

  return (
    <>
      <div className="flex flex-col min-h-screen">
        {/* Title Section */}
        <main className="flex-grow">
          <div className="flex justify-center p-3">
            <h1 className="font-extrabold text-center m-1.5">To-Do List</h1>
            <Image
              src="/favicon.png"
              width={50}
              height={50}
              alt="To-Do List Logo"
            />
          </div>
          {/* Insert tasks from user here */}
          <TasksPage />
        </main>

        {/* Footer for icon credits */}
      </div>
    </>
  );
}
