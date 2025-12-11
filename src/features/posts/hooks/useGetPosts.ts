import { useQuery } from '@tanstack/react-query';
import { getPosts } from '../services/posts.service';
import { useAppStore } from '@/store/useAppStore';
import { useSearchParams } from 'react-router-dom';

export const useGetPosts = () => {
    const [searchParams] = useSearchParams();
    const { postFilter, postSortColumn, postSortDirection } = useAppStore();
    const postPage = parseInt(searchParams.get('page') || '1', 10);
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