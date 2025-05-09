"use client";

import { useEffect } from "react";
import Image from "next/image";
import { supabase } from "./lib/supabaseClient";
import TasksView from "./tasks/TasksView";

export default function Page() {
  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        window.location.href = "/login";
      }
    };

    checkUser();
  }, []);

  return (
    <>
      <main className="flex flex-col min-h-screen">
        <div className="flex justify-center mt-3">
          <Image
            src="/mario-todo-title.png"
            width={285}
            height={49}
            alt="Title"
          />
        </div>
        <TasksView />
      </main>
    </>
  );
}
