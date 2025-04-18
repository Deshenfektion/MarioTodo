import { supabase } from "../lib/supabaseClient";

export async function createTask(
  userId: string,
  title: string,
  description: string
) {
  const { data, error } = await supabase
    .from("tasks")
    .insert([
      {
        user_id: userId,
        title: title,
        description: description,
        status: "open",
      },
    ])
    .single(); // Gibt nur ein Task zurück, statt ein Array

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function updateTask(
  taskId: number,
  title: string,
  description: string,
  status: string
) {
  const { data, error } = await supabase
    .from("tasks")
    .update({ title, description, status, updated_at: new Date() })
    .eq("id", taskId)
    .single(); // Nur einen Task zurückgeben

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function deleteTask(taskId: number) {
  const { error } = await supabase.from("tasks").delete().eq("id", taskId);

  if (error) {
    throw new Error(error.message);
  }
}

export async function getTasks(userId: string) {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false }); // Optional: nach Erstellungsdatum sortieren

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
