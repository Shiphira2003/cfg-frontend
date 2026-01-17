import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

const StudentLayout: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Mock logout function
    const handleLogout = () => {
        // Clear tokens/state here
        navigate('/auth/login');
    };

    const isActive = (path: string) => {
        return location.pathname === path ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900';
    };

    return (
        <div className="min-h-screen bg-gray-50 flex font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col fixed h-full z-40">
                <div className="h-16 flex items-center px-6 border-b border-gray-100">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xl">C</span>
                        </div>
                        <span className="font-bold text-lg text-gray-900">CFG Portal</span>
                    </Link>
                </div>

                <div className="flex-1 overflow-y-auto py-4">
                    <nav className="px-3 space-y-1">
                        <Link
                            to="/student/dashboard"
                            className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${isActive('/student/dashboard')}`}
                        >
                            <span className="mr-3 text-xl">📊</span>
                            Dashboard
                        </Link>
                        <Link
                            to="/student/applications"
                            className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${isActive('/student/applications')}`}
                        >
                            <span className="mr-3 text-xl">📂</span>
                            My Applications
                        </Link>
                        <Link
                            to="/student/apply"
                            className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${isActive('/student/apply')}`}
                        >
                            <span className="mr-3 text-xl">✨</span>
                            New Application
                        </Link>
                        <Link
                            to="/student/profile"
                            className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${isActive('/student/profile')}`}
                        >
                            <span className="mr-3 text-xl">👤</span>
                            My Profile
                        </Link>
                    </nav>
                </div>

                <div className="p-4 border-t border-gray-100">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center px-3 py-2 text-sm font-medium text-red-600 rounded-md hover:bg-red-50 transition-colors"
                    >
                        <span className="mr-3 text-xl">🚪</span>
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Wrapper */}
            <div className="flex-1 flex flex-col md:ml-64 min-h-screen transition-all duration-300">
                <Header
                    user={{ name: "Student User" }}
                    onMenuClick={() => console.log("Toggle menu")} // Placeholder for mobile menu logic
                />

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto p-4 sm:p-8 bg-gray-50">
                    <div className="max-w-5xl mx-auto">
                        <Outlet />
                    </div>
                </main>

                <Footer />
            </div>
        </div>
    );
};

export default StudentLayout;
