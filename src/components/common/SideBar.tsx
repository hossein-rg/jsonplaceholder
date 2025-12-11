import { NavLink } from 'react-router-dom';
import { useAppStore } from '@/store/useAppStore';
const Sidebar = () => {
    const toggleSidebar = useAppStore((state) => state.toggleSidebar);
    const handleLinkClick = () => {
        toggleSidebar(false)
    }
    const getNavLinkClass = ({ isActive }: { isActive: boolean }) => {
        const baseClasses = 'block rounded-md p-2 transition-colors';
        const activeClasses = 'bg-orange-500/90 text-primary-foreground';
        const inactiveClasses = 'text-muted-foreground hover:bg-accent hover:text-accent-foreground';
        return `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`;
    };
    return (
        <aside className="w-60 pt-14 h-full shrink-0 bg-muted/50 border-r border-border p-4">
            <nav>
                <ul className="flex bg- flex-col space-y-2">
                    <li>
                        <NavLink to="/users" className={getNavLinkClass} onClick={handleLinkClick}>
                            Users
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/posts" className={getNavLinkClass} onClick={handleLinkClick}>
                            Posts
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
