import type { StateCreator } from 'zustand';

type SortableUserColumns = 'id' | 'name' | 'email' | 'username';

export interface UsersSlice {
    userPage: number;
    userFilter: string;
    userSortColumn: SortableUserColumns;
    userSortDirection: 'asc' | 'desc';
    setUserPage: (page: number) => void;
    setUserFilter: (filter: string) => void;
    setUserSort: (column: SortableUserColumns) => void;
}

export const createUsersSlice: StateCreator<UsersSlice> = (set, get) => ({
    userPage: 1,
    userFilter: '',
    userSortColumn: 'id',
    userSortDirection: 'asc',
    setUserPage: (page) => set({ userPage: page }),
    setUserFilter: (filter) => {
        set({ userFilter: filter, userPage: 1 });
    },
    setUserSort: (column) => {
        const { userSortColumn, userSortDirection } = get();
        const newDirection =
            userSortColumn === column && userSortDirection === 'asc' ? 'desc' : 'asc';
        set({ userSortColumn: column, userSortDirection: newDirection });
    },
});
