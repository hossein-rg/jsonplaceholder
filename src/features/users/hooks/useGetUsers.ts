import { useQuery } from '@tanstack/react-query';
import { getUsers } from '../services/users.service';
import { useAppStore } from '@/store/useAppStore';

export const useGetUsers = () => {
    const userPage = useAppStore((state) => state.userPage);
    return useQuery({
        queryKey: ['users', userPage],
        queryFn: () => getUsers({ _page: userPage }),
        keepPreviousData: true,
    });
};
