import { useAppStore } from '../../store/useAppStore';
import { Sun, Moon } from 'lucide-react';

const ThemeToggler = () => {
    const { theme, toggleTheme } = useAppStore();
    return (
        <button
            onClick={toggleTheme}
            className="rounded-full p-2 text-text-primary transition-colors hover:bg-accent"
            aria-label="Toggle theme"
        >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
    );
};

export default ThemeToggler;
