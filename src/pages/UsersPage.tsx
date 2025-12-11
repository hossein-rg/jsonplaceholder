import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import UsersTable from '@/features/users/components/UsersTable';
import { useGetUsers } from '@/features/users/hooks/useGetUsers';
import { useAppStore } from '@/store/useAppStore';

const USERS_PER_PAGE = 10;

const UsersPage = () => {
    const { data, isLoading, isError, isFetching } = useGetUsers();
    const { userPage, setUserPage } = useAppStore();

    const totalPages = Math.ceil((data?.totalCount || 0) / USERS_PER_PAGE);

    const handlePageChange = (page: number) => {
        if (page > 0 && page <= totalPages) {
            setUserPage(page);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-foreground">Users</h2>
                {isFetching && <div className="text-muted-foreground">Updating...</div>}
            </div>

            {isLoading && <div className="text-center text-muted-foreground">Loading users...</div>}
            {isError && <div className="text-center text-destructive">Error fetching data.</div>}

            {data && <UsersTable users={data.data} />}

            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            href="#"
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
                            href="#"
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
