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
        return <p className="p-6">Loading audit logs...</p>;
    }

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-xl font-semibold">
                    Audit Trail — Application #{id}
                </h1>

                <button
                    onClick={() => navigate(-1)}
                    className="bg-gray-700 text-white px-4 py-1 rounded hover:bg-gray-800"
                >
                    Back
                </button>
            </div>

            {logs.length === 0 ? (
                <p className="text-gray-500">No audit records found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border border-collapse">
                        <thead className="bg-gray-100">
                        <tr>
                            <th className="border p-2 text-left">Action</th>
                            <th className="border p-2 text-left">Admin</th>
                            <th className="border p-2 text-left">Old Value</th>
                            <th className="border p-2 text-left">New Value</th>
                            <th className="border p-2 text-left">Date</th>
                        </tr>
                        </thead>

                        <tbody>
                        {logs.map((log) => (
                            <tr key={log.id} className="align-top">
                                <td className="border p-2 font-medium">
                                    {log.action}
                                </td>

                                <td className="border p-2">
                                    {log.admin_email}
                                </td>

                                <td className="border p-2 text-sm">
                                        <pre className="whitespace-pre-wrap break-words">
                                            {JSON.stringify(log.old_value, null, 2)}
                                        </pre>
                                </td>

                                <td className="border p-2 text-sm">
                                        <pre className="whitespace-pre-wrap break-words">
                                            {JSON.stringify(log.new_value, null, 2)}
                                        </pre>
                                </td>

                                <td className="border p-2">
                                    {new Date(log.created_at).toLocaleString()}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ApplicationAuditLogs;
