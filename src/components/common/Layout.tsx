import React, { useEffect } from 'react';
import Header from './Header';
import Sidebar from './SideBar';
import { useAppStore } from '@/store/useAppStore';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import Footer from './Footer';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    const { theme, isSidebarOpen, toggleSidebar } = useAppStore();

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(theme);
    }, [theme]);

    return (
        <div className="flex flex-grow min-h-screen flex-col bg-background text-foreground">
            <Header />
            <div className="flex flex-1">
                <div className="hidden sm:block">
                    <Sidebar />
                </div>
                <Sheet open={isSidebarOpen} onOpenChange={toggleSidebar}>
                    <SheetContent side="left" className="w-[240px] p-0 pt-10">
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