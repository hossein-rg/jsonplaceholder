import { create } from 'zustand';
import { type ThemeSlice, createThemeSlice } from './theme.slice';
type AppState = ThemeSlice;

export const useAppStore = create<AppState>()((...a) => ({
    ...createThemeSlice(...a),
}));
