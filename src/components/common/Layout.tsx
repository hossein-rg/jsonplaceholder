import Header from './Header';
import Sidebar from './SideBar';
import { useAppStore } from '@/store/useAppStore';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import Footer from './Footer';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    const { isSidebarOpen, toggleSidebar } = useAppStore();

    return (
        <div className="flex flex-grow min-h-screen flex-col bg-background text-foreground select-none">
            <Header />
            <div className="flex flex-1">
                <div className="hidden md:block">
                    <Sidebar />
                </div>
                <Sheet open={isSidebarOpen} onOpenChange={toggleSidebar}>
                    <SheetContent side="left" className="w-[240px] p-0">
                        <SheetHeader>
                            <SheetTitle className="sr-only">Main Menu</SheetTitle>
                        </SheetHeader>
                        <Sidebar />
                    </SheetContent>
                </Sheet>
                <main className="flex-grow p-4 md:p-6 min-w-0">{children}</main>
            </div>
            <Footer />
        </div>
    );
};

export default Layout;