import type { StateCreator } from 'zustand';

export interface UsersSlice {
    userPage: number;
    setUserPage: (page: number) => void;
}

export const createUsersSlice: StateCreator<UsersSlice> = (set) => ({
    userPage: 1,
    setUserPage: (page) => set({ userPage: page }),
});
