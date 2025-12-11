import ThemeToggler from './ThemeToggler';

const Header = () => {
    return (
        <header className="border-b border-foreground bg-background shadow-sm">
            <div className="container mx-auto flex items-center justify-between p-4">
                <h1 className="text-xl font-bold text-text-primary">Admin Panel</h1>
                <ThemeToggler />
            </div>
        </header>
    );
};

export default Header;
