import React from 'react';
import { useLocation } from 'react-router-dom';

interface HeaderProps {
    user?: {
        name: string;
        imageUrl?: string;
    };
    onMenuClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onMenuClick }) => {
    const location = useLocation();

    const getPageTitle = (pathname: string) => {
        if (pathname.startsWith('/admin')) {
            if (pathname.includes('/audit-logs')) return 'Application Audit Trail';
            return 'Admin Portal';
        }

        switch (pathname) {
            case '/student/dashboard': return 'Student Dashboard';
            case '/student/applications': return 'My Applications';
            case '/student/apply': return 'New Application';
            case '/student/profile': return 'My Profile';
            default: return pathname.startsWith('/student') ? 'Student Portal' : 'County Financial Gateway';
        }
    };

    return (
        <header className="bg-primary text-white border-b border-primary/90 sticky top-0 z-30 shadow-md">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Mobile menu button */}
                    <div className="flex items-center md:hidden">
                        <button
                            type="button"
                            className="text-white/80 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white p-2 rounded-md"
                            onClick={onMenuClick}
                        >
                            <span className="sr-only">Open sidebar</span>
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>

                    {/* Page Title */}
                    <div className="flex-1 flex justify-center md:justify-start">
                        <h1 className="text-xl font-semibold text-white">
                            {getPageTitle(location.pathname)}
                        </h1>
                    </div>

                    {/* Right section: Notifications & Profile */}
                    <div className="flex items-center space-x-4">
                        <button className="p-2 bg-primary-light/10 text-white/80 hover:text-white rounded-full hover:bg-white/10 transition-colors relative">
                            <span className="sr-only">View notifications</span>
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                            {/* Notification dot */}
                            <span className="absolute top-2 right-2 block h-2 w-2 rounded-full bg-action ring-2 ring-primary"></span>
                        </button>

                        <div className="hidden md:flex items-center space-x-3 border-l border-white/20 pl-4">
                            <div className="text-right">
                                <p className="text-sm font-medium text-white">{user?.name || 'User'}</p>
                                <p className="text-xs text-white/70">View Profile</p>
                            </div>
                            <div className="h-9 w-9 rounded-full bg-white flex items-center justify-center text-primary font-bold border-2 border-white/20 shadow-sm">
                                {user?.name ? user.name.charAt(0).toUpperCase() : 'S'}
                            </div>
                        </div>

                        {/* Mobile Profile Icon (Simplified) */}
                        <div className="md:hidden">
                            <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center text-primary font-bold">
                                {user?.name ? user.name.charAt(0).toUpperCase() : 'S'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};
