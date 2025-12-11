import type { StateCreator } from 'zustand';

export type Theme = 'light' | 'dark';

export interface ThemeSlice {
    theme: Theme;
    toggleTheme: () => void;
}
export const createThemeSlice: StateCreator<ThemeSlice> = (set) => ({
    theme: 'light',
    toggleTheme: () =>
        set((state) => ({
            theme: state.theme === 'light' ? 'dark' : 'light',
        })),
});
