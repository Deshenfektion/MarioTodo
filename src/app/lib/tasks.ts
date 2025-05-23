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
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function updateTask(taskId: number, status: string) {
  const updates: any = { updated_at: new Date() };
  if (status !== undefined) updates.status = status;

  const { data, error } = await supabase
    .from("tasks")
    .update(updates)
    .eq("id", taskId)
    .single();

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
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
