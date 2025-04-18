"use client";

import { useEffect } from "react";
import Image from "next/image";
import { supabase } from "./lib/supabaseClient"; // Dein Supabase-Client
import TasksView from "./tasks/TasksView";

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
          <div className="flex justify-center p-3 gap-2">
            <Image
              src="/mario-todo-title.png"
              width={285}
              height={49}
              alt="Title"
            />
            <Image
              src="/mario-hat.png"
              width={50}
              height={50}
              alt="To-Do List Logo"
            />
          </div>
          <TasksView />
        </main>

        {/* Footer for icon credits */}
      </div>
    </>
  );
}
