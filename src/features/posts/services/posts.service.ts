import apiClient from '@/lib/axios';
import type { Post } from '@/types/index';

const POSTS_PER_PAGE = 10;

interface GetPostsParams {
    _page: number;
    _limit?: number;
    q?: string;
    _sort?: string;
    _order?: 'asc' | 'desc';
}

interface GetPostsResponse {
    data: Post[];
    totalCount: number;
}

export const getPosts = async (params: GetPostsParams): Promise<GetPostsResponse> => {
    const response = await apiClient.get('/posts', {
        params: { ...params, _limit: POSTS_PER_PAGE },
    });
    const totalCount = parseInt(response.headers['x-total-count'] || '0', 10);
    return { data: response.data, totalCount };
};
