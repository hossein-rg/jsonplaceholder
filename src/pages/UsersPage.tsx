import { useMemo } from 'react';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import UsersTable from '@/features/users/components/UsersTable';
import UserFilters from '@/features/users/components/UserFilters';
import { useGetUsers } from '@/features/users/hooks/useGetUsers';
import { useAppStore } from '@/store/useAppStore';
const USERS_PER_PAGE = 10;

const UsersPage = () => {
    const { data: allUsers, isLoading, isError } = useGetUsers();
    const { userPage, setUserPage, userFilter, userSortColumn, userSortDirection } = useAppStore();
    const processedData = useMemo(() => {
        if (!allUsers) return { paginatedUsers: [], totalPages: 0 };
        // filter
        const filteredUsers = allUsers.filter(user =>
            user.name.toLowerCase().includes(userFilter.toLowerCase()) ||
            user.email.toLowerCase().includes(userFilter.toLowerCase()) ||
            user.username.toLowerCase().includes(userFilter.toLowerCase())
        );
        // sort
        const sortedUsers = [...filteredUsers].sort((a, b) => {
            const aValue = a[userSortColumn];
            const bValue = b[userSortColumn];
            if (aValue < bValue) return userSortDirection === 'asc' ? -1 : 1;
            if (aValue > bValue) return userSortDirection === 'asc' ? 1 : -1;
            return 0;
        });
        // pagination
        const totalPages = Math.ceil(sortedUsers.length / USERS_PER_PAGE);
        const startIndex = (userPage - 1) * USERS_PER_PAGE;
        const paginatedUsers = sortedUsers.slice(startIndex, startIndex + USERS_PER_PAGE);

        return { paginatedUsers, totalPages };
    }, [allUsers, userFilter, userSortColumn, userSortDirection, userPage]);

    const { paginatedUsers, totalPages } = processedData;

    const handlePageChange = (page: number) => {
        if (page > 0 && page <= totalPages) {
            setUserPage(page);
        }
    }

    if (isLoading) return <div className="text-center text-muted-foreground">Loading initial data...</div>;
    if (isError) return <div className="text-center text-destructive">Error fetching data.</div>;
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-foreground">Users</h2>
            </div>
            <UserFilters />
            <UsersTable users={paginatedUsers} />
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() => handlePageChange(userPage - 1)}
                            className={userPage <= 1 ? 'pointer-events-none opacity-50' : undefined}
                        />
                    </PaginationItem>
                    <PaginationItem>
                        <span className="p-2 text-sm text-muted-foreground">
                            Page {userPage} of {totalPages}
                        </span>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext
                            onClick={() => handlePageChange(userPage + 1)}
                            className={userPage >= totalPages ? 'pointer-events-none opacity-50' : undefined}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
};

export default UsersPage;
