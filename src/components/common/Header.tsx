import { Menu } from 'lucide-react';
import ThemeToggler from './ThemeToggler';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/components/ui/button';

const Header = () => {
    const toggleSidebar = useAppStore((state) => state.toggleSidebar);
    return (
        <header className="border-b border-border bg-background shadow-sm">
            <div className="container mx-auto flex items-center justify-between p-2 md:p-4">
                <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden"
                    onClick={() => toggleSidebar(true)}
                >
                    <Menu className="h-6 w-6" />
                </Button>

                <h1 className="text-lg font-bold text-orange-500/90 md:text-xl">Mini Task</h1>
                <ThemeToggler />
            </div>
        </header>
    );
};

export default Header;
