import { Input } from '@/components/ui/input';
import { useDebouncedCallback } from 'use-debounce';

interface PostFiltersProps {
    onFilterChange: (value: string) => void;
    initialValue?: string;
}

const PostFilters = ({ onFilterChange, initialValue }: PostFiltersProps) => {
    const debounced = useDebouncedCallback((value) => {
        onFilterChange(value);
    }, 800);
    return <Input className="max-w-sm" placeholder="Filter by title or body..." defaultValue={initialValue} onChange={(e) => debounced(e.target.value)} />
};
export default PostFilters;
