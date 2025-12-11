import type { StateCreator } from 'zustand';

type SortablePostColumns = 'id' | 'title' | 'body';

export interface PostsSlice {
    postPage: number;
    postFilter: string;
    postSortColumn: SortablePostColumns;
    postSortDirection: 'asc' | 'desc';
    setPostPage: (page: number) => void;
    setPostFilter: (filter: string) => void;
    setPostSort: (column: SortablePostColumns) => void;
}

export const createPostsSlice: StateCreator<PostsSlice> = (set, get) => ({
    postPage: 1,
    postFilter: '',
    postSortColumn: 'id',
    postSortDirection: 'asc',
    setPostPage: (page) => set({ postPage: page }),
    setPostFilter: (filter) => {
        set({ postFilter: filter, postPage: 1 });
    },
    setPostSort: (column) => {
        const { postSortColumn, postSortDirection } = get();
        const newDirection =
            postSortColumn === column && postSortDirection === 'asc' ? 'desc' : 'asc';
        set({ postSortColumn: column, postSortDirection: newDirection });
    },
});
