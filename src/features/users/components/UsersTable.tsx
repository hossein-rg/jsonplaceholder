import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import type { User } from '@/types/index';
import { QueryErrorFallback } from '@/components/common/QueryErrorBoundary';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
interface UsersTableProps {
    users: User[] | undefined;
    isLoading: boolean;
    isError: boolean;
    error: Error | null;
    onRefetch: () => void;
}

const UsersTable = ({
    users,
    isLoading,
    isError,
    error,
    onRefetch,
}: UsersTableProps) => {
    const { setUserSort, userSortColumn, userSortDirection } = useAppStore();

    const renderSortIcon = (column: 'id' | 'name' | 'email' | 'username') => {
        if (userSortColumn !== column) {
            return <ArrowUpDown className="ml-2 h-4 w-4 text-muted-foreground/50" />;
        }
        return userSortDirection === 'asc' ? (
            <ArrowUp className="ml-2 h-4 w-4" />
        ) : (
            <ArrowDown className="ml-2 h-4 w-4" />
        );
    };

    return (
        <ScrollArea className="rounded-md h-fit border overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[80px] p-0">
                            <Button variant="ghost" onClick={() => setUserSort('id')}>
                                ID {renderSortIcon('id')}
                            </Button>
                        </TableHead>
                        <TableHead>
                            <Button variant="ghost" onClick={() => setUserSort('name')}>
                                Name {renderSortIcon('name')}
                            </Button>
                        </TableHead>
                        <TableHead>
                            <Button variant="ghost" onClick={() => setUserSort('email')}>
                                Email {renderSortIcon('email')}
                            </Button>
                        </TableHead>
                        <TableHead>
                            <Button variant="ghost" onClick={() => setUserSort('username')}>
                                Username {renderSortIcon('username')}
                            </Button>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {isLoading && (
                        <TableRow>
                            <TableCell colSpan={4} className="h-60 text-center text-muted-foreground">
                                Loading...
                            </TableCell>
                        </TableRow>
                    )}
                    {isError && (
                        <TableRow>
                            <TableCell colSpan={4}>
                                <QueryErrorFallback error={error!} resetErrorBoundary={onRefetch} />
                            </TableCell>
                        </TableRow>
                    )}
                    {!isLoading && !isError && users?.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={4} className="h-60 text-center text-muted-foreground">
                                No results found.
                            </TableCell>
                        </TableRow>
                    )}
                    {!isLoading && !isError && users?.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell className="font-medium pl-5">{user.id}</TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.username}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <ScrollBar orientation='horizontal' />
        </ScrollArea>
    );
};

export default UsersTable;
