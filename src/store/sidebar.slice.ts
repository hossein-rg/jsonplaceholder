import type { StateCreator } from 'zustand';

export interface SidebarSlice {
    isSidebarOpen: boolean;
    toggleSidebar: (isOpen?: boolean) => void;
}

export const createSidebarSlice: StateCreator<SidebarSlice> = (set) => ({
    isSidebarOpen: false,
    toggleSidebar: (isOpen) =>
        set((state) => ({
            isSidebarOpen: isOpen !== undefined ? isOpen : !state.isSidebarOpen,
        })),
});
