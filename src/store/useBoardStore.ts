import { Task, TaskStatus } from "@/types/task";
import { create } from "zustand";

interface BoardState {
  searchTerm: string;
  isModalOpen: boolean;
  editingTask: Task | null;
  defaultColumn: TaskStatus;
  setSearchTerm: (term: string) => void;
  openModal: (task?: Task | null, defaultColumn?: TaskStatus) => void;
  closeModal: () => void;
}

export const useBoardStore = create<BoardState>((set) => ({
  searchTerm: "",
  isModalOpen: false,
  editingTask: null,
  defaultColumn: "backlog",

  setSearchTerm: (term) => set({ searchTerm: term }),

  openModal: (task = null, defaultColumn = "backlog") =>
    set({
      isModalOpen: true,
      editingTask: task,
      defaultColumn: defaultColumn,
    }),

  closeModal: () =>
    set({
      isModalOpen: false,
      editingTask: null,
    }),
}));
