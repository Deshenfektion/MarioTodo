"use client";

import { useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

export default function LoginPage() {
  const handleGithubLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
    });

    if (error) {
      console.error("GitHub login error:", error.message);
    }
  };

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        window.location.href = "/";
      }
    };

    checkUser();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 text-center">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <button
          onClick={handleGithubLogin}
          className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800"
        >
          Log in with GitHub
        </button>
      </div>
    </div>
  );
}
