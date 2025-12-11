import { useQuery } from '@tanstack/react-query';
import { getPosts } from '../services/posts.service';
import { useAppStore } from '@/store/useAppStore';

export const useGetPosts = () => {
    const { postPage, postFilter, postSortColumn, postSortDirection } = useAppStore();

    return useQuery({
        queryKey: ['posts', postPage, postFilter, postSortColumn, postSortDirection],
        queryFn: () =>
            getPosts({
                _page: postPage,
                q: postFilter,
                _sort: postSortColumn,
                _order: postSortDirection,
            }),
        keepPreviousData: true,
    });
};
