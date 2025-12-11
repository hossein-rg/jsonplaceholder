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
import type { User } from '@/types/index';

interface UsersTableProps {
    users: User[];
}

const UsersTable = ({ users }: UsersTableProps) => {
    const { setUserSort, userSortColumn, userSortDirection } = useAppStore();

    const renderSortIcon = (column: 'id' | 'name' | 'email' | 'username') => {
        if (userSortColumn !== column) {
            return <ArrowUpDown className="ml-2 h-4 w-4 text-muted-foreground/50" />;
        }
        return userSortDirection === 'asc' ? (
            <ArrowUpDown className="ml-2 h-4 w-4" />
        ) : (
            <ArrowUpDown className="ml-2 h-4 w-4" />
        );
    };

    return (
        <div className="rounded-md border overflow-x-auto">
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
                    {users?.length ? (
                        users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell className="font-medium pl-5">{user.id}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.username}</TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={4} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default UsersTable;
