"use client";

import { useEffect, useState } from "react";
import { supabase } from "./lib/supabaseClient";
import { getTasks, createTask, updateTask, deleteTask } from "./lib/tasks";
import "./tasks.css";

export default function TasksPage() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [user, setUser] = useState<any>(null);

  // User laden
  useEffect(() => {
    const loadUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        loadTasks(user.id);
      } else {
        window.location.href = "/login"; // Weiterleitung zur Login-Seite, falls nicht eingeloggt
      }
    };

    loadUser();
  }, []);

  // Tasks laden
  const loadTasks = async (userId: string) => {
    const tasks = await getTasks(userId);
    setTasks(tasks);
  };

  // Neue Aufgabe erstellen
  const handleCreateTask = async () => {
    if (user) {
      const newTaskData = await createTask(
        user.id,
        newTask.title,
        newTask.description
      );
      setTasks([newTaskData, ...tasks]); // Füge die neue Aufgabe hinzu
      setNewTask({ title: "", description: "" }); // Zurücksetzen des Eingabefeldes
    }
  };

  // Aufgabe aktualisieren (Status ändern)
  const handleUpdateTask = async (taskId: number, status: string) => {
    if (user) {
      const updatedTask = await updateTask(taskId, "", "", status);
      setTasks(tasks.map((task) => (task.id === taskId ? updatedTask : task))); // Aufgabe im State aktualisieren
    }
  };

  // Aufgabe löschen
  const handleDeleteTask = async (taskId: number) => {
    if (user) {
      await deleteTask(taskId);
      setTasks(tasks.filter((task) => task.id !== taskId)); // Aufgabe aus der Liste entfernen
    }
  };

  return (
    <div className="tasks-container">
      <h1>Your Tasks</h1>
      <div className="new-task">
        <input
          type="text"
          placeholder="Task Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <textarea
          placeholder="Task Description"
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
        />
        <button onClick={handleCreateTask}>Create Task</button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
            <button onClick={() => handleUpdateTask(task.id, "completed")}>
              Mark as completed
            </button>
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
