import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    const getNavLinkClass = ({ isActive }: { isActive: boolean }) => {
        const baseClasses = 'block rounded-md p-2 transition-colors';
        const activeClasses = 'bg-primary text-white';
        const inactiveClasses = 'text-text-secondary hover:bg-background hover:text-text-primary';

        return `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`;
    };

    return (
        <aside className="w-60 shrink-0 bg-foreground p-4">
            <nav>
                <ul className="flex flex-col space-y-2">
                    <li>
                        <NavLink to="/users" className={getNavLinkClass}>
                            Users
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/posts" className={getNavLinkClass}>
                            Posts
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
