import apiClient from '@/lib/axios';
import type { User } from '@/types/index';

const USERS_PER_PAGE = 10;

interface GetUsersParams {
    _page: number;
    _limit?: number;
}

interface GetUsersResponse {
    data: User[];
    totalCount: number;
}

export const getUsers = async (params: GetUsersParams): Promise<GetUsersResponse> => {
    const response = await apiClient.get('/users', {
        params: { ...params, _limit: USERS_PER_PAGE },
    });
    const totalCount = parseInt(response.headers['x-total-count'] || '0', 10);
    return { data: response.data, totalCount };
};
