import { create } from "zustand";
import { Light } from "../styles/theme";
export const useThemeStore = create((set, get) => ({
  theme: "light",
  themeStyle: Light,
  setTheme: (p) => {
    set({ theme: p.tema });
    set({ themeStyle: p.style });
  },
}));
