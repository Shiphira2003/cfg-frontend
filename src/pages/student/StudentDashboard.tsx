import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMyApplications } from '../../api/student.api';
import { useAuth } from '../../context/AuthContext';

const StudentDashboard: React.FC = () => {
    const { user } = useAuth();
    const [applications, setApplications] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getMyApplications();
                setApplications(data);
            } catch (err) {
                console.error("Failed to fetch applications", err);
                setError("Failed to load application data.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Helper to get latest application
    const latestApp = applications.length > 0 ? applications[0] : null;

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.email}</h1>
                <p className="text-gray-500 mt-1">Here is what is happening with your applications today.</p>
            </div>

            {loading ? (
                <div className="flex justify-center p-8">Loading dashboard...</div>
            ) : error ? (
                <div className="p-4 bg-red-50 text-red-600 rounded-lg">{error}</div>
            ) : (
                <>
                    {/* Stats / Status Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Active Application Card */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-2 bg-blue-50 rounded-lg">
                                    <span className="text-2xl">📄</span>
                                </div>
                                {latestApp ? (
                                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${latestApp.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                                            latestApp.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                                                'bg-yellow-100 text-yellow-800'
                                        }`}>
                                        {latestApp.status}
                                    </span>
                                ) : (
                                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-600">No Applications</span>
                                )}
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">
                                {latestApp ? `${latestApp.financial_year || 'Current'} Application` : 'No Active Application'}
                            </h3>
                            {latestApp && <p className="text-gray-500 text-sm mt-1">Status as of today</p>}
                            <div className="mt-4">
                                <Link to="/student/applications" className="text-blue-600 text-sm font-medium hover:text-blue-700">View Details &rarr;</Link>
                            </div>
                        </div>

                        {/* Profile Completion Card (Still Static for now as we don't have profile API fully spec'd) */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-2 bg-purple-50 rounded-lg">
                                    <span className="text-2xl">👤</span>
                                </div>
                                <span className="text-gray-400 text-sm">80%</span>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">Profile Complete</h3>
                            <p className="text-gray-500 text-sm mt-1">Add your bank details to reach 100%.</p>
                            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-4">
                                <div className="bg-purple-600 h-1.5 rounded-full" style={{ width: '80%' }}></div>
                            </div>
                        </div>

                        {/* Announcements Card */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-2 bg-orange-50 rounded-lg">
                                    <span className="text-2xl">📢</span>
                                </div>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">Announcements</h3>
                            <p className="text-gray-500 text-sm mt-1">Application deadline extended to Feb 28th.</p>
                        </div>
                    </div>

                    {/* Recent Activity / Next Steps */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
                        {applications.length > 0 ? (
                            <div className="space-y-4">
                                {applications.slice(0, 3).map((app, idx) => (
                                    <div key={idx} className="flex items-center gap-4 py-2 border-b border-gray-50 last:border-0">
                                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-900">Application Submitted</p>
                                            <p className="text-xs text-gray-500">{new Date(app.created_at || Date.now()).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500">No recent activity.</p>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default StudentDashboard;
