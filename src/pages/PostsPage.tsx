import { useSearchParams } from 'react-router-dom';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import PostFilters from '@/features/posts/components/PostFilters';
import PostsTable from '@/features/posts/components/PostsTable';
import { useGetPosts } from '@/features/posts/hooks/useGetPosts';
const POSTS_PER_PAGE = 10;
const PostsPage = () => {
    const { data, isLoading, isError, error, refetch } = useGetPosts();
    const [searchParams, setSearchParams] = useSearchParams();
    const page = parseInt(searchParams.get('page') || '1', 10);
    const totalPages = Math.ceil((data?.totalCount || 0) / POSTS_PER_PAGE);
    const handlePageChange = (newPage: number) => {
        if (newPage > 0) {
            setSearchParams((prev) => {
                prev.set('page', newPage.toString());
                return prev;
            });
        }
    };
    const handleFilterChange = (newFilter: string) => {
        setSearchParams((prev) => {
            prev.set('q', newFilter);
            prev.set('page', '1');
            return prev;
        });
    };
    const handleSortChange = (newSort: string) => {
        setSearchParams((prev) => {
            const currentOrder = prev.get('order');
            const newOrder =
                prev.get('sort') === newSort && currentOrder === 'asc' ? 'desc' : 'asc';
            prev.set('sort', newSort);
            prev.set('order', newOrder);
            return prev;
        });
    };
    return (
        <div className="space-y-2">
            <div className="flex flex-col pb-3">
                <h2 className="text-3xl font-bold text-foreground">Posts</h2>
                <p>Sorting, Filtering, and Pagination:
                    Server-Side Logic: The server processes the data and returns only the small, relevant subset of posts required for the current page. The client's only job is to display the data it receives.</p>
            </div>
            <PostFilters
                onFilterChange={handleFilterChange}
                initialValue={searchParams.get('q') || ''}
            />
            <PostsTable
                posts={data?.data}
                isLoading={isLoading}
                isError={isError}
                error={error as Error | null}
                onRefetch={refetch}
                onSortChange={handleSortChange}
            />

            {!isLoading && !isError && data?.data && data.data.length > 0 && (
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                onClick={() => handlePageChange(page - 1)}
                                className={page <= 1 ? 'pointer-events-none opacity-50' : undefined}
                            />
                        </PaginationItem>
                        <PaginationItem>
                            <span className="p-2 text-sm text-muted-foreground">
                                Page {page} of {totalPages}
                            </span>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext
                                onClick={() => handlePageChange(page + 1)}
                                className={page >= totalPages ? 'pointer-events-none opacity-50' : undefined}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            )}
        </div>
    );
};
export default PostsPage;
