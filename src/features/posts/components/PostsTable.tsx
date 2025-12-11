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
import { useAppStore } from '@/store/useAppStore';
import type { Post } from '@/types/index';

interface PostsTableProps {
    posts: Post[];
}

const PostsTable = ({ posts }: PostsTableProps) => {
    const { setPostSort } = useAppStore();

    return (
        <div className="rounded-md border overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">
                            <Button variant="ghost" onClick={() => setPostSort('id')}>
                                ID <ArrowUpDown className="ml-2 h-4 w-4" />
                            </Button>
                        </TableHead>
                        <TableHead>
                            <Button variant="ghost" onClick={() => setPostSort('title')}>
                                Title <ArrowUpDown className="ml-2 h-4 w-4" />
                            </Button>
                        </TableHead>
                        <TableHead>
                            <Button variant="ghost" onClick={() => setPostSort('body')}>
                                Body <ArrowUpDown className="ml-2 h-4 w-4" />
                            </Button>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {posts?.map((post) => (
                        <TableRow key={post.id}>
                            <TableCell className="font-medium">{post.id}</TableCell>
                            <TableCell>{post.title}</TableCell>
                            <TableCell className="truncate max-w-xs">{post.body}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default PostsTable;
