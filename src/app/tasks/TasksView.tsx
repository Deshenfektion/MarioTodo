import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { getTasks, createTask, updateTask, deleteTask } from "../lib/tasks"; // Importiere alle Funktionen
import "./tasks.css";
import Image from "next/image";

export default function TasksView() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const loadUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        loadTasks(user.id); // Lade Aufgaben, wenn der User existiert
      } else {
        window.location.href = "/login"; // Weiterleitung zur Login-Seite
      }
    };

    loadUser();
  }, []);

  // Sicherstellen, dass tasks nie null oder undefined ist
  const loadTasks = async (userId: string) => {
    const tasks = await getTasks(userId);
    setTasks(tasks || []); // Falls tasks null ist, setze ein leeres Array
  };

  // Neue Aufgabe erstellen
  const handleCreateTask = async () => {
    if (user && newTask.title) {
      try {
        const newTaskData = await createTask(
          user.id,
          newTask.title,
          newTask.description
        );

        console.log("New task created:", newTaskData); // Debugging: Zeige die Rückgabe von createTask an

        if (newTaskData) {
          setTasks([newTaskData, ...tasks]); // Füge die neue Aufgabe an den Anfang der Liste hinzu
          setNewTask({ title: "", description: "" }); // Setze die Eingabefelder zurück
        } else {
          console.error("No task data returned from createTask");
          alert("Failed to create task. Please try again.");
        }
      } catch (error) {
        console.error("Error creating task:", error);
        alert("An error occurred while creating the task. Please try again.");
      }
    } else {
      console.error("Please fill out the title");
      alert("Please fill out the title.");
    }
  };

  // Aufgabe aktualisieren
  const handleUpdateTask = async (taskId: number, status: string) => {
    if (user) {
      try {
        const updatedTask = await updateTask(taskId, status); // Nur den Status aktualisieren
        setTasks(
          tasks.map((task) => (task.id === taskId ? updatedTask : task))
        );
      } catch (error) {
        console.error("Error updating task:", error);
        alert("Failed to update task. Please try again.");
      }
    }
  };

  // Aufgabe löschen
  const handleDeleteTask = async (taskId: number) => {
    if (user) {
      try {
        await deleteTask(taskId);
        setTasks(tasks.filter((task) => task.id !== taskId));
      } catch (error) {
        console.error("Error deleting task:", error);
        alert("Failed to delete task. Please try again.");
      }
    }
  };

  return (
    <div className="tasksContainer">
      <Image
        className="mb-3"
        src="/your-tasks-header.png"
        width={143}
        height={25}
        alt="Colorful header"
      />
      <div className="newTask">
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
      <ul className="taskList">
        {tasks && tasks.length > 0 ? (
          tasks.map((task) => {
            if (!task || task.status != "open") return null;
            return (
              <li key={task.id} className="taskItem">
                <h2>{task.title}</h2>
                <p>{task.description}</p>
                <button onClick={() => handleUpdateTask(task.id, "completed")}>
                  Mark as completed
                </button>
                <button onClick={() => handleDeleteTask(task.id)}>
                  Delete
                </button>
              </li>
            );
          })
        ) : (
          <p>No tasks available.</p>
        )}
      </ul>
    </div>
  );
}
