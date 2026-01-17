import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAuditLogs } from "../../api/applications.api";

type AuditLog = {
    id: number;
    user_id: number;
    admin_email: string;
    action: string;
    old_value: Record<string, any> | null;
    new_value: Record<string, any> | null;
    created_at: string;
};

const ChangeValueDisplay = ({ value }: { value: Record<string, any> | null }) => {
    if (!value) return <span className="text-gray-400 italic text-sm">-</span>;

    return (
        <div className="space-y-1.5 p-2 bg-gray-50/50 rounded-lg border border-gray-100/50">
            {Object.entries(value).map(([key, val]) => (
                <div key={key} className="text-sm flex flex-col sm:flex-row sm:items-baseline gap-1">
                    <span className="font-semibold text-xs uppercase tracking-wide text-gray-500 w-32 shrink-0">
                        {key.replace(/_/g, " ")}
                    </span>
                    <span className="text-gray-900 font-medium break-all">
                        {typeof val === "number" && (key.includes("amount") || key.includes("price"))
                            ? val.toLocaleString(undefined, { minimumFractionDigits: 2 })
                            : String(val)}
                    </span>
                </div>
            ))}
        </div>
    );
};

const ActionBadge = ({ action }: { action: string }) => {
    const styles = {
        APPROVED: "bg-green-100 text-green-700 ring-green-600/20",
        REJECTED: "bg-red-100 text-red-700 ring-red-600/20",
        PENDING: "bg-yellow-100 text-yellow-800 ring-yellow-600/20",
    };
    const defaultStyle = "bg-gray-100 text-gray-700 ring-gray-500/10";
    const activeStyle = styles[action as keyof typeof styles] || defaultStyle;

    return (
        <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${activeStyle}`}>
            {action}
        </span>
    );
};

const ApplicationAuditLogs = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [logs, setLogs] = useState<AuditLog[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                if (!id) return;

                const response = await getAuditLogs(Number(id));
                setLogs(response.audit_logs || []);
            } catch (error) {
                console.error("Failed to load audit logs:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchLogs();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-500 font-medium">Loading audit trail...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="mb-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="group flex items-center text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors mb-4"
                    >
                        <svg className="h-5 w-5 mr-1 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Dashboard
                    </button>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Audit Trail</h1>
                            <p className="mt-1 text-sm text-gray-500">
                                Viewing history for Application <span className="font-mono bg-gray-100 px-2 py-0.5 rounded text-gray-700">#{id}</span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Content Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    {logs.length === 0 ? (
                        <div className="p-12 text-center">
                            <div className="mx-auto h-12 w-12 text-gray-400 mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900">No history found</h3>
                            <p className="mt-1 text-gray-500 max-w-sm mx-auto">
                                There are no audit records recorded for this application yet.
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                            Action
                                        </th>
                                        <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                            Administrator
                                        </th>
                                        <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-1/4">
                                            Old Value
                                        </th>
                                        <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-1/4">
                                            New Value
                                        </th>
                                        <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                            Timestamp
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {logs.map((log) => (
                                        <tr key={log.id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <ActionBadge action={log.action} />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs mr-3">
                                                        {log.admin_email[0].toUpperCase()}
                                                    </div>
                                                    <span className="text-sm font-medium text-gray-900">{log.admin_email}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <ChangeValueDisplay value={log.old_value} />
                                            </td>
                                            <td className="px-6 py-4">
                                                <ChangeValueDisplay value={log.new_value} />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <div className="flex flex-col">
                                                    <span className="font-medium text-gray-900">
                                                        {new Date(log.created_at).toLocaleDateString(undefined, {
                                                            year: 'numeric',
                                                            month: 'short',
                                                            day: 'numeric'
                                                        })}
                                                    </span>
                                                    <span className="text-xs text-gray-400">
                                                        {new Date(log.created_at).toLocaleTimeString(undefined, {
                                                            hour: '2-digit',
                                                            minute: '2-digit'
                                                        })}
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ApplicationAuditLogs;
