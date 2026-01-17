import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

const AdminLayout: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isCollapsed, setIsCollapsed] = React.useState(false);

    // Mock logout function
    const handleLogout = () => {
        // Clear tokens/state here
        navigate('/auth/login');
    };

    const isActive = (path: string) => {
        return location.pathname === path ? 'bg-primary/10 text-primary border-r-4 border-primary' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900';
    };

    return (
        <div className="min-h-screen bg-background flex font-sans">
            {/* Sidebar */}
            <aside
                className={`${isCollapsed ? 'w-20' : 'w-64'} bg-surface border-r border-gray-200 hidden md:flex flex-col fixed h-full z-40 transition-all duration-300 ease-in-out`}
            >
                <div className="h-16 flex items-center px-4 border-b border-gray-100 relative">
                    <Link to="/admin" className={`flex items-center gap-2 overflow-hidden transition-all duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto'}`}>
                        {!isCollapsed && <span className="font-bold text-lg text-primary whitespace-nowrap">Admin Portal</span>}
                    </Link>

                    {/* Toggle Button */}
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className={`absolute -right-3 top-1/2 -translate-y-1/2 bg-white border border-gray-200 rounded-full w-6 h-6 flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors z-50 cursor-pointer text-gray-400 hover:text-primary`}
                    >
                        <span className={`text-xs transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`}>◀</span>
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto py-4 overflow-x-hidden">
                    <nav className="px-3 space-y-1">
                        {[
                            { to: '/admin', icon: '📊', label: 'Dashboard' }
                        ].map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all ${isActive(link.to)} ${isCollapsed ? 'justify-center' : ''}`}
                                title={isCollapsed ? link.label : ''}
                            >
                                <span className={`text-xl ${isCollapsed ? 'mr-0' : 'mr-3'}`}>{link.icon}</span>
                                {!isCollapsed && <span className="whitespace-nowrap opacity-100 transition-opacity duration-300">{link.label}</span>}
                            </Link>
                        ))}
                    </nav>
                </div>

                <div className="p-4 border-t border-gray-100 overflow-hidden">
                    <button
                        onClick={handleLogout}
                        className={`w-full flex items-center px-3 py-2 text-sm font-medium text-red-600 rounded-md hover:bg-red-50 transition-colors cursor-pointer ${isCollapsed ? 'justify-center' : ''}`}
                        title={isCollapsed ? 'Sign Out' : ''}
                    >
                        <span className={`text-xl ${isCollapsed ? 'mr-0' : 'mr-3'}`}>🚪</span>
                        {!isCollapsed && <span className="whitespace-nowrap transition-opacity duration-300">Sign Out</span>}
                    </button>
                </div>
            </aside>

            {/* Main Wrapper */}
            <div className={`flex-1 flex flex-col ${isCollapsed ? 'md:ml-20' : 'md:ml-64'} min-h-screen transition-all duration-300 ease-in-out`}>
                <Header
                    user={{ name: "Admin User" }}
                    onMenuClick={() => console.log("Toggle menu")}
                />

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto p-4 sm:p-8 bg-background">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>

                <Footer />
            </div>
        </div>
    );
};

export default AdminLayout;
