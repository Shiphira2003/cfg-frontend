import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-background flex flex-col font-sans">
            {/* Navbar */}
            <nav className="bg-surface shadow-sm border-b border-gray-100 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
                                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-md">
                                    <span className="text-white font-bold text-xl">C</span>
                                </div>
                                <span className="font-bold text-xl text-primary tracking-tight">County Financial Gateway</span>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Link to="/auth/login" className="text-gray-500 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                Sign In
                            </Link>
                            <Link to="/register-student" className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm hover:shadow-md">
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="flex-grow flex items-center justify-center bg-surface relative overflow-hidden">
                {/* Background Blobs */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl opacity-50"></div>
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-action/5 rounded-full filter blur-3xl opacity-50"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col md:flex-row items-center gap-12 relative z-10">
                    <div className="md:w-1/2 text-center md:text-left space-y-6">
                        <div className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide border border-primary/20">
                            Education for Everyone
                        </div>
                        <h1 className="text-4xl md:text-6xl font-extrabold text-text leading-tight">
                            Build Your Future With <span className="text-primary">Financial Freedom</span>
                        </h1>
                        <p className="text-lg text-gray-600 max-w-lg mx-auto md:mx-0">
                            Access bursaries and scholarships designed to help you succeed. Streamlined applications for students, powerful management for administrators.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                            <Link to="/student/apply" className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-action hover:bg-action/90 md:py-4 md:text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5">
                                Apply Now
                            </Link>
                            <Link to="/auth/login" className="inline-flex items-center justify-center px-8 py-3 border border-gray-200 text-base font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 md:py-4 md:text-lg shadow-sm hover:shadow transition-all">
                                Admin Portal
                            </Link>
                        </div>
                    </div>
                    {/* Abstract Visual/Illustration */}
                    <div className="md:w-1/2 relative">
                        <div className="relative bg-white/80 backdrop-blur-lg border border-white/40 shadow-2xl rounded-2xl p-8 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                            <div className="space-y-4">
                                <div className="flex justify-between items-center mb-6">
                                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                                    <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center text-green-600">✓</div>
                                </div>
                                <div className="h-4 bg-gray-100 rounded w-full"></div>
                                <div className="h-4 bg-gray-100 rounded w-5/6"></div>
                                <div className="h-4 bg-gray-100 rounded w-4/6"></div>
                                <div className="mt-6 flex gap-4">
                                    <div className="h-10 bg-primary/20 rounded-lg w-1/2"></div>
                                    <div className="h-10 bg-gray-100 rounded-lg w-1/2"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="bg-background py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-text">How It Works</h2>
                        <p className="mt-4 text-gray-600">Simple steps to get your education funded.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: "Create Account", desc: "Register quickly as a student to access the portal.", icon: "📝" },
                            { title: "Submit Application", desc: "Upload documents and fill in your details securely.", icon: "📤" },
                            { title: "Get Funded", desc: "Track status and receive funds directly upon approval.", icon: "🎓" },
                        ].map((feature, idx) => (
                            <div key={idx} className="bg-surface p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                                <div className="text-4xl mb-4 text-primary bg-primary/5 p-3 rounded-xl w-16 h-16 flex items-center justify-center">{feature.icon}</div>
                                <h3 className="text-xl font-bold text-text mb-2">{feature.title}</h3>
                                <p className="text-gray-600">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-surface border-t border-gray-100 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-gray-500 text-sm">© {new Date().getFullYear()} County Financial Gateway. All rights reserved.</p>
                    <div className="flex space-x-6">
                        <a href="#" className="text-gray-400 hover:text-primary transition-colors">Privacy</a>
                        <a href="#" className="text-gray-400 hover:text-primary transition-colors">Terms</a>
                        <a href="#" className="text-gray-400 hover:text-primary transition-colors">Support</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
