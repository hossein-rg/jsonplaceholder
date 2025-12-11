import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './SideBar';
import { useAppStore } from '../../store/useAppStore';
import { useEffect } from 'react';
interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    const theme = useAppStore((state) => state.theme);
    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(theme);
    }, [theme]);

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className='flex flex-1'>
                <Sidebar />
                <main className="grow container bg-background mx-auto p-4">
                    {children}
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default Layout;
