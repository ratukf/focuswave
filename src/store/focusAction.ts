import { create } from "zustand";

type FocusState = {
  isFocusMode: boolean;
  setFocusMode: (on: boolean) => void;
};

export const useFocusStore = create<FocusState>((set) => ({
  isFocusMode: false,
  setFocusMode: (on) => set({ isFocusMode: on }),
}));
