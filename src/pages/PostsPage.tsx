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
import { useSearchParams } from 'react-router-dom';
const POSTS_PER_PAGE = 10;

const PostsPage = () => {
    const { data, isLoading, isError, isFetching } = useGetPosts();
    const [searchParams, setSearchParams] = useSearchParams();
    const postPage = parseInt(searchParams.get('page') || '1', 10);
    const totalPages = Math.ceil((data?.totalCount || 0) / POSTS_PER_PAGE);
    const handlePageChange = (newPage: number) => {
        if (newPage > 0 && newPage <= totalPages) {
            setSearchParams((prev) => {
                prev.set('page', newPage.toString());
                return prev;
            });
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-foreground">Posts</h2>
                {isFetching && !isLoading && <div className="text-sm text-muted-foreground">Updating...</div>}
            </div>

            <PostFilters />

            {isLoading && <div className="text-center text-muted-foreground">Loading posts...</div>}
            {isError && <div className="text-center text-destructive">Error fetching posts.</div>}

            {data && <PostsTable posts={data.data} />}

            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() => handlePageChange(postPage - 1)}
                            className={postPage <= 1 ? 'pointer-events-none opacity-50' : undefined}
                        />
                    </PaginationItem>
                    <PaginationItem>
                        <span className="p-2 text-sm text-muted-foreground">
                            Page {postPage} of {totalPages}
                        </span>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext
                            onClick={() => handlePageChange(postPage + 1)}
                            className={postPage >= totalPages ? 'pointer-events-none opacity-50' : undefined}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
};

export default PostsPage;
