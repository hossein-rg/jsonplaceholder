import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';
import type { Post } from '@/types/index';
import { ScrollBar, ScrollArea } from '@/components/ui/scroll-area';
import { QueryErrorFallback } from '@/components/common/QueryErrorBoundary';
interface PostsTableProps {
    posts: Post[] | undefined;
    isLoading: boolean;
    isError: boolean;
    error: Error | null;
    onRefetch: () => void;
    onSortChange: (column: string) => void;
}
const PostsTable = ({
    posts,
    isLoading,
    isError,
    error,
    onRefetch,
    onSortChange,
}: PostsTableProps) => {
    return (
        <ScrollArea className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[80px] p-0">
                            <Button variant="ghost" onClick={() => onSortChange('id')}>
                                ID <ArrowUpDown className="ml-2 h-4 w-4" />
                            </Button>
                        </TableHead>
                        <TableHead className='min-w-[200px]'>
                            <Button variant="ghost" onClick={() => onSortChange('title')}>
                                Title <ArrowUpDown className="ml-2 h-4 w-4" />
                            </Button>
                        </TableHead>
                        <TableHead className='min-w-[300px]'>
                            <Button variant="ghost" onClick={() => onSortChange('body')}>
                                Body <ArrowUpDown className="ml-2 h-4 w-4" />
                            </Button>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {isLoading && (
                        <TableRow>
                            <TableCell colSpan={3} className="h-60 text-center text-muted-foreground">
                                Loading...
                            </TableCell>
                        </TableRow>
                    )}
                    {isError && (
                        <TableRow>
                            <TableCell colSpan={3}>
                                <QueryErrorFallback error={error!} resetErrorBoundary={onRefetch} />
                            </TableCell>
                        </TableRow>
                    )}
                    {!isLoading && !isError && posts?.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={3} className="h-60 text-center text-muted-foreground">
                                No results found.
                            </TableCell>
                        </TableRow>
                    )}
                    {!isLoading && !isError && posts?.map((post) => (
                        <TableRow key={post.id}>
                            <TableCell className="font-medium pl-5">{post.id}</TableCell>
                            <TableCell className='max-w-sm'>{post.title}</TableCell>
                            <TableCell className='max-w-md'>{post.body}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <ScrollBar orientation='horizontal' />
        </ScrollArea>
    );
};

export default PostsTable;
