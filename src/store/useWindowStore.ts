import { create } from "zustand";

export type mainContent = "courses" | "expand-review" | "moments"

interface windowState {
  isMax: boolean,   // 窗口是否最大化
  currentMainWindow: mainContent, // 目前主页面上的内容
  toggleMax: () => void,
  changeTo: (newContent: mainContent) => void
}

export const useWindowStore = create<windowState>((set) => ({
  isMax: true,
  currentMainWindow: "courses",
  toggleMax: () => set((state) => ({ isMax: !state.isMax })),
  changeTo: (newContent) => set(() => ({ currentMainWindow: newContent }))
}));