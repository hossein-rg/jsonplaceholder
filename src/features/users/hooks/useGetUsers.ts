import { useQuery } from '@tanstack/react-query';
import { getUsers } from '../services/users.service';

export const useGetUsers = () => {
    return useQuery({
        queryKey: ['users'],
        queryFn: getUsers,
        staleTime: 1000 * 60 * 2,
        gcTime: 1000 * 60 * 2
    });
};
