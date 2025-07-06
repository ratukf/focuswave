import { create } from "zustand";

export type Task = {
  id: string;
  title: string;
  done: boolean;
};

type TaskStore = {
  tasks: Task[];
  addTask: (title: string) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  editTask: (id: string, newTitle: string) => void;
};

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: JSON.parse(localStorage.getItem("focuswave-tasks") || "[]"),
  
  addTask: (title) =>
    set((state) => {
      const updated = [
        ...state.tasks,
        { id: crypto.randomUUID(), title, done: false },
      ];
      localStorage.setItem("focuswave-tasks", JSON.stringify(updated));
      return { tasks: updated };
    }),

  toggleTask: (id) =>
    set((state) => {
      const updated = state.tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      );
      localStorage.setItem("focuswave-tasks", JSON.stringify(updated));
      return { tasks: updated };
    }),

  deleteTask: (id) =>
    set((state) => {
      const updated = state.tasks.filter((task) => task.id !== id);
      localStorage.setItem("focuswave-tasks", JSON.stringify(updated));
      return { tasks: updated };
    }),

  editTask: (id, newTitle) =>
    set((state) => {
      const updated = state.tasks.map((task) =>
        task.id === id ? { ...task, title: newTitle } : task
      );
      localStorage.setItem("focuswave-tasks", JSON.stringify(updated));
      return { tasks: updated };
    }),
}));
