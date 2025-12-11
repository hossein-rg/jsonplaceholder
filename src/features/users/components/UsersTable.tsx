import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import type { User } from '@/types/index';

interface UsersTableProps {
    users: User[];
}

const UsersTable = ({ users }: UsersTableProps) => {
    return (
        // فقط کلاس `overflow-x-auto` به اینجا اضافه شده است
        <div className="rounded-md border overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Company</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users?.length ? (
                        users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell className="font-medium">{user.id}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.company.name}</TableCell>
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
