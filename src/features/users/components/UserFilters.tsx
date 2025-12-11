import { Input } from '@/components/ui/input';
import { useAppStore } from '@/store/useAppStore';

const UserFilters = () => {
    const { userFilter, setUserFilter } = useAppStore();

    return (
        <div className="flex items-center">
            <Input
                placeholder="Filter by name, email, etc..."
                value={userFilter}
                onChange={(e) => setUserFilter(e.target.value)}
                className="max-w-sm"
            />
        </div>
    );
};

export default UserFilters;
