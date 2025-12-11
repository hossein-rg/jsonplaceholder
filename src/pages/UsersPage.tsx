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
    // 1. تمام وضعیت‌ها را از هوک دریافت می‌کنیم
    const { data: allUsers, isLoading, isError, error, refetch } = useGetUsers();
    const { userPage, setUserPage, userFilter, userSortColumn, userSortDirection } = useAppStore();

    const processedData = useMemo(() => {
        if (!allUsers) return { paginatedUsers: [], totalPages: 0 };

        const filteredUsers = allUsers.filter(user =>
            user.name.toLowerCase().includes(userFilter.toLowerCase()) ||
            user.email.toLowerCase().includes(userFilter.toLowerCase()) ||
            user.username.toLowerCase().includes(userFilter.toLowerCase())
        );

        const sortedUsers = [...filteredUsers].sort((a, b) => {
            const aValue = a[userSortColumn];
            const bValue = b[userSortColumn];
            if (aValue < bValue) return userSortDirection === 'asc' ? -1 : 1;
            if (aValue > bValue) return userSortDirection === 'asc' ? 1 : -1;
            return 0;
        });

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
    };
    return (
        <div className="flex flex-col space-y-3">
            <div className="flex flex-col pb-2">
                <h2 className="text-3xl font-bold text-foreground">Users</h2>
                <p>Sorting, Filtering, and Pagination: All operations—sorting by column, filtering via the search input, and paginating through the results—are performed entirely in the browser using JavaScript</p>
            </div>
            <UserFilters />
            <UsersTable
                users={paginatedUsers}
                isLoading={isLoading}
                isError={isError}
                error={error as Error | null}
                onRefetch={refetch}
            />
            {!isLoading && !isError && paginatedUsers.length > 0 && (
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
            )}
        </div>
    );
};

export default UsersPage;
