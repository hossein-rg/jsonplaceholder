import { create } from 'zustand';
import { type ThemeSlice, createThemeSlice } from './theme.slice';
import { type UsersSlice, createUsersSlice } from './users.slice';
import { type SidebarSlice, createSidebarSlice } from './sidebar.slice';
import { type PostsSlice, createPostsSlice } from './posts.slice';
type AppState = ThemeSlice & UsersSlice & SidebarSlice & PostsSlice;

export const useAppStore = create<AppState>()((...a) => ({
    ...createThemeSlice(...a),
    ...createUsersSlice(...a),
    ...createSidebarSlice(...a),
    ...createPostsSlice(...a),
}));
