import apiClient from '@/lib/axios';
import type { User } from '@/types/index';

export const getUsers = async (): Promise<User[]> => {
    const response = await apiClient.get('/users');
    return response.data;
};
