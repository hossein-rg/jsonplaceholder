import type { StateCreator } from 'zustand';

type SortablePostColumns = 'id' | 'title' | 'body';

export interface PostsSlice {
    postFilter: string;
    postSortColumn: SortablePostColumns;
    postSortDirection: 'asc' | 'desc';
    setPostFilter: (filter: string) => void;
    setPostSort: (column: SortablePostColumns) => void;
}

export const createPostsSlice: StateCreator<PostsSlice> = (set, get) => ({
    postFilter: '',
    postSortColumn: 'id',
    postSortDirection: 'asc',
    setPostFilter: (filter) => {
        set({ postFilter: filter });
    },
    setPostSort: (column) => {
        const { postSortColumn, postSortDirection } = get();
        const newDirection =
            postSortColumn === column && postSortDirection === 'asc' ? 'desc' : 'asc';
        set({ postSortColumn: column, postSortDirection: newDirection });
    },
});
