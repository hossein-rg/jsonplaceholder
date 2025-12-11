import { Input } from '@/components/ui/input';
import { useAppStore } from '@/store/useAppStore';
import { useDebouncedCallback } from 'use-debounce';

const PostFilters = () => {
    const setPostFilter = useAppStore((state) => state.setPostFilter);

    const debounced = useDebouncedCallback((value) => {
        setPostFilter(value);
    }, 500);

    return (
        <div className="flex items-center">
            <Input
                placeholder="Filter by title or body..."
                onChange={(e) => debounced(e.target.value)}
                className="max-w-sm"
            />
        </div>
    );
};

export default PostFilters;
