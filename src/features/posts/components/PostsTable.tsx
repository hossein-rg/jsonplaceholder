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
import { ScrollBar, ScrollArea } from '@/components/ui/scroll-area';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
interface PostsTableProps {
    posts: Post[];
}

const PostsTable = ({ posts }: PostsTableProps) => {
    const { setPostSort } = useAppStore();

    return (
        <ScrollArea className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[80px] p-0">
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
                            <TableCell className="font-medium pl-5">{post.id}</TableCell>
                            <TableCell className='max-w-xs'>{post.title}</TableCell>
                            <TableCell className="max-w-lg">{post.body}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <ScrollBar orientation='horizontal' />
        </ScrollArea>
    );
};

export default PostsTable;
