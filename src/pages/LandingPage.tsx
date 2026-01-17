import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            {/* Navbar */}
            <nav className="bg-white shadow-sm border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
                                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-xl">B</span>
                                </div>
                                <span className="font-bold text-xl text-gray-900 tracking-tight">County Financial Gateway</span>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Link to="/auth/login" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                Sign In
                            </Link>
                            <Link to="/register-student" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm hover:shadow-md">
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="flex-grow flex items-center justify-center bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col md:flex-row items-center gap-12">
                    <div className="md:w-1/2 text-center md:text-left space-y-6">
                        <div className="inline-block bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide">
                            Education for Everyone
                        </div>
                        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
                            Build Your Future With <span className="text-blue-600">Financial Freedom</span>
                        </h1>
                        <p className="text-lg text-gray-600 max-w-lg mx-auto md:mx-0">
                            Access bursaries and scholarships designed to help you succeed. Streamlined applications for students, powerful management for administrators.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                            <Link to="/student/apply" className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5">
                                Apply Now
                            </Link>
                            <Link to="/auth/login" className="inline-flex items-center justify-center px-8 py-3 border border-gray-200 text-base font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 md:py-4 md:text-lg shadow-sm hover:shadow transition-all">
                                Admin Portal
                            </Link>
                        </div>
                    </div>
                    {/* Abstract Visual/Illustration */}
                    <div className="md:w-1/2 relative">
                        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob"></div>
                        <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-2000"></div>
                        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-100 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-4000"></div>

                        <div className="relative bg-white/60 backdrop-blur-lg border border-white/20 shadow-2xl rounded-2xl p-8 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                            <div className="space-y-4">
                                <div className="h-8 bg-gray-200 rounded w-1/3 animate-pulse"></div>
                                <div className="h-4 bg-gray-100 rounded w-full"></div>
                                <div className="h-4 bg-gray-100 rounded w-5/6"></div>
                                <div className="h-4 bg-gray-100 rounded w-4/6"></div>
                                <div className="mt-6 flex gap-4">
                                    <div className="h-10 bg-blue-600/20 rounded-lg w-1/2"></div>
                                    <div className="h-10 bg-gray-100 rounded-lg w-1/2"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="bg-gray-50 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
                        <p className="mt-4 text-gray-600">Simple steps to get your education funded.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: "Create Account", desc: "Register quickly as a student to access the portal.", icon: "📝" },
                            { title: "Submit Application", desc: "Upload documents and fill in your details securely.", icon: "📤" },
                            { title: "Get Funded", desc: "Track status and receive funds directly upon approval.", icon: "🎓" },
                        ].map((feature, idx) => (
                            <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                                <div className="text-4xl mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                                <p className="text-gray-600">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-100 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-gray-500 text-sm">© {new Date().getFullYear()} County Financial Gateway. All rights reserved.</p>
                    <div className="flex space-x-6">
                        <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">Privacy</a>
                        <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">Terms</a>
                        <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">Support</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
