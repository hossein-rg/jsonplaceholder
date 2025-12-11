import { useQuery } from '@tanstack/react-query';
import { getPosts } from '../services/posts.service';
import { useSearchParams } from 'react-router-dom';

export const useGetPosts = () => {
    const [searchParams] = useSearchParams();

    const page = parseInt(searchParams.get('page') || '1', 10);
    const filter = searchParams.get('q') || '';
    const sortColumn = searchParams.get('sort') || 'id';
    const sortDirection = searchParams.get('order') || 'asc';

    return useQuery({
        queryKey: ['posts', page, filter, sortColumn, sortDirection],
        queryFn: () => getPosts({
            _page: page,
            q: filter,
            _sort: sortColumn,
            _order: sortDirection as 'asc' | 'desc',
        }),
    });
};