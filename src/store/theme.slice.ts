import type { StateCreator } from 'zustand';

type Theme = 'light' | 'dark';

export interface ThemeSlice {
    theme: Theme;
    toggleTheme: () => void;
}

const applyTheme = (theme: Theme) => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
};

export const createThemeSlice: StateCreator<ThemeSlice> = (set) => {
    const storedTheme = localStorage.getItem('task-theme') as Theme;
    const initialTheme = storedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    applyTheme(initialTheme);

    return {
        theme: initialTheme,
        toggleTheme: () => {
            set((state) => {
                const newTheme = state.theme === 'light' ? 'dark' : 'light';
                localStorage.setItem('task-theme', newTheme);
                applyTheme(newTheme);
                return { theme: newTheme };
            });
        },
    };
};
