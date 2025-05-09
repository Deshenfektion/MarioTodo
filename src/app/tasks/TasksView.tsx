import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { getTasks, createTask, updateTask, deleteTask } from "../lib/tasks";
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
        loadTasks(user.id);
      } else {
        window.location.href = "/login";
      }
    };

    loadUser();
  }, []);

  const loadTasks = async (userId: string) => {
    const tasks = await getTasks(userId);
    setTasks(tasks || []);
  };

  const handleCreateTask = async () => {
    if (user && newTask.title) {
      try {
        const newTaskData = await createTask(
          user.id,
          newTask.title,
          newTask.description
        );

        if (newTaskData) {
          setTasks([newTaskData, ...tasks]);
          setNewTask({ title: "", description: "" });
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

  const handleUpdateTask = async (taskId: number, status: string) => {
    if (user) {
      try {
        const updatedTask = await updateTask(taskId, status);
        setTasks(
          tasks.map((task) => (task.id === taskId ? updatedTask : task))
        );
      } catch (error) {
        console.error("Error updating task:", error);
        alert("Failed to update task. Please try again.");
      }
    }
  };

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
    <main className="flex flex-col justify-center items-center">
      <div className="tasksContainer">
        <ul className="taskList">
          {tasks && tasks.length > 0 ? (
            tasks.map((task) => {
              if (!task || task.status != "open") return null;
              return (
                <li key={task.id} className="taskItem">
                  <div>
                    <h2>{task.title}</h2>
                    <p className="taskDescription">{task.description}</p>
                  </div>
                  <div className="taskItemContainer">
                    <button
                      onClick={() => handleUpdateTask(task.id, "completed")}
                    >
                      <Image
                        src="/check-icon.svg"
                        width={48}
                        height={48}
                        alt="check icon"
                      />
                    </button>
                    <button onClick={() => handleDeleteTask(task.id)}>
                      <Image
                        src="/cancel-icon.svg"
                        width={48}
                        height={48}
                        alt="cancel icon"
                      />
                    </button>
                  </div>
                </li>
              );
            })
          ) : (
            <p></p>
          )}
        </ul>
      </div>
      <div className="createNewTasksContainer">
        <Image
          className="mb-3"
          src="/create-new-tasks.png"
          width={225.75}
          height={27}
          alt="Create new tasks header"
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
          <div className="flex justify-center">
            <button className="modal-action" onClick={handleCreateTask}>
              <div className="modal-action-fade" />
              <div className="modal-action-pattern" />
              <div className="modal-action-text">Create Task</div>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
