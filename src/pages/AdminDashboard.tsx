import { useEffect, useState } from "react";
import { getApplications, updateApplicationStatus, getAuditLogs, registerAdmin } from "../api/admin.api";

type Application = {
    id: number;
    full_name: string;
    national_id: string;
    institution: string;
    course: string;
    year_of_study: number;
    cycle_year: number;
    amount_requested: number;
    amount_allocated: number;
    status: string;
    taada_flag: string;
    document_url: string[];
    created_at: string;
};

export default function AdminDashboard() {
    const [applications, setApplications] = useState<Application[]>([]);
    const [selectedAppId, setSelectedAppId] = useState<number | null>(null);
    const [auditLogs, setAuditLogs] = useState<any[]>([]);
    const [loadingLogs, setLoadingLogs] = useState(false);
    const [statusFilter, setStatusFilter] = useState<string>("PENDING");
    const [logsError, setLogsError] = useState<string>("");

    // ----------------------------
    // Safe parser for document_url
    // ----------------------------
    const parseDocumentUrl = (input: any): string[] => {
        if (!input) return [];
        if (Array.isArray(input)) return input;
        if (typeof input === "string") {
            try {
                // Only parse if it looks like a JSON array
                if (input.trim().startsWith("[") && input.trim().endsWith("]")) {
                    return JSON.parse(input);
                }
                return [input];
            } catch (err) {
                console.warn("Failed to parse document_url:", input, err);
                return [input];
            }
        }
        return [];
    };

    // ----------------------------
    // Fetch applications
    // ----------------------------
    const fetchApplications = async () => {
        try {
            console.log("Fetching applications with statusFilter:", statusFilter);

            const res = await getApplications(statusFilter);
            console.log("Raw API response:", res);

            if (!res || !res.data) {
                console.warn("No data returned from API");
                setApplications([]);
                return;
            }

            // Safely parse document_url for each application
            const apps: Application[] = res.data.map((app: any) => ({
                ...app,
                document_url: parseDocumentUrl(app.document_url),
            }));

            console.log("Parsed applications data:", apps);
            setApplications(apps);
        } catch (err) {
            console.error("Error fetching applications:", err);
            setApplications([]);
        }
    };

    useEffect(() => {
        fetchApplications();
    }, [statusFilter]);

    // ----------------------------
    // Approve / Reject
    // ----------------------------
    const handleStatusChange = async (appId: number, status: string) => {
        try {
            console.log(`Changing status of application ${appId} to ${status}`);

            let amount_allocated = 0;

            if (status === "APPROVED") {
                const input = prompt("Enter allocated amount") || "0";
                console.log("User entered allocated amount:", input);
                amount_allocated = parseFloat(input);

                if (amount_allocated <= 0) {
                    alert("Amount must be greater than 0");
                    console.warn("Invalid allocated amount, aborting status update");
                    return;
                }
            }

            const res = await updateApplicationStatus(appId.toString(), status, amount_allocated);
            console.log("Status update response:", res);

            // Refresh applications after update
            fetchApplications();
        } catch (err) {
            console.error("Error updating application status:", err);
        }
    };

    // ----------------------------
    // View Audit Logs
    // ----------------------------
    const handleViewAuditLogs = async (appId: number) => {
        setSelectedAppId(appId);
        setLoadingLogs(true);
        setLogsError("");
        try {
            const res = await getAuditLogs(appId.toString());
            console.log(`Audit logs for application ${appId}:`, res);
            setAuditLogs(res.audit_logs || []);
        } catch (err) {
            console.error("Error fetching audit logs:", err);
            setAuditLogs([]);
            setLogsError("Failed to load audit logs.");
        } finally {
            setLoadingLogs(false);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

            {/* Status Filter */}
            <div className="mb-4">
                <label>Filter by status: </label>
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="border p-1"
                >
                    <option value="">All</option>
                    <option value="PENDING">Pending</option>
                    <option value="APPROVED">Approved</option>
                    <option value="REJECTED">Rejected</option>
                </select>
            </div>

            {/* Applications Table */}
            <table className="w-full border border-gray-300 mb-4">
                <thead>
                <tr>
                    <th className="border p-2">Name</th>
                    <th className="border p-2">Institution</th>
                    <th className="border p-2">Course</th>
                    <th className="border p-2">Year</th>
                    <th className="border p-2">Amount Requested</th>
                    <th className="border p-2">Status</th>
                    <th className="border p-2">TAADA</th>
                    <th className="border p-2">Documents</th>
                    <th className="border p-2">Actions</th>
                </tr>
                </thead>
                <tbody>
                {applications.length > 0 ? (
                    applications.map((app) => (
                        <tr key={app.id}>
                            <td className="border p-2">{app.full_name}</td>
                            <td className="border p-2">{app.institution}</td>
                            <td className="border p-2">{app.course}</td>
                            <td className="border p-2">{app.year_of_study}</td>
                            <td className="border p-2">{app.amount_requested}</td>
                            <td className="border p-2">{app.status}</td>
                            <td className="border p-2">{app.taada_flag}</td>
                            <td className="border p-2">
                                {app.document_url.map((url, idx) => (
                                    <a key={idx} href={`http://localhost:5000/${url}`} target="_blank" rel="noreferrer">
                                        Document {idx + 1}
                                    </a>
                                ))}
                            </td>
                            <td className="border p-2 space-x-2">
                                <button
                                    className="bg-green-600 text-white px-2 py-1"
                                    onClick={() => handleStatusChange(app.id, "APPROVED")}
                                >
                                    Approve
                                </button>
                                <button
                                    className="bg-red-600 text-white px-2 py-1"
                                    onClick={() => handleStatusChange(app.id, "REJECTED")}
                                >
                                    Reject
                                </button>
                                <button
                                    className="bg-blue-600 text-white px-2 py-1"
                                    onClick={() => handleViewAuditLogs(app.id)}
                                >
                                    Audit Logs
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={9} className="border p-2 text-center">
                            No applications found
                        </td>
                    </tr>
                )}
                </tbody>
            </table>

            {/* Audit Logs */}
            {selectedAppId && (
                <div className="mt-6">
                    <h2 className="text-xl font-semibold mb-2">Audit Logs for Application {selectedAppId}</h2>

                    {loadingLogs && <p>Loading audit logs...</p>}
                    {logsError && <p className="text-red-600">{logsError}</p>}

                    {!loadingLogs && !logsError && (
                        <table className="w-full border border-gray-300">
                            <thead>
                            <tr>
                                <th className="border p-2">Admin</th>
                                <th className="border p-2">Action</th>
                                <th className="border p-2">Old Value</th>
                                <th className="border p-2">New Value</th>
                                <th className="border p-2">Time</th>
                            </tr>
                            </thead>
                            <tbody>
                            {auditLogs.length > 0 ? (
                                auditLogs.map((log) => (
                                    <tr key={log.id}>
                                        <td className="border p-2">{log.admin_email}</td>
                                        <td className="border p-2">{log.action}</td>
                                        <td className="border p-2">{log.old_value}</td>
                                        <td className="border p-2">{log.new_value}</td>
                                        <td className="border p-2">{new Date(log.created_at).toLocaleString()}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="border p-2 text-center">
                                        No audit logs found
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    )}
                </div>
            )}

            {/* Register Admin Section */}
            <div className="mt-6 p-4 border rounded">
                <h2 className="text-xl font-semibold mb-2">Register New Admin</h2>
                <AdminRegisterForm onRegister={fetchApplications} />
            </div>
        </div>
    );
}

// ----------------------------
// Admin Register Form
// ----------------------------
function AdminRegisterForm({ onRegister }: { onRegister: () => void }) {
    const [full_name, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await registerAdmin({ full_name, email, password });
            alert("Admin registered successfully");
            setFullName("");
            setEmail("");
            setPassword("");
            onRegister();
        } catch (err) {
            alert("Failed to register admin");
            console.error(err);
        }
    };

    return (
        <form onSubmit={submit} className="space-y-2">
            <input
                value={full_name}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Full Name"
                className="border p-1 w-full"
            />
            <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                type="email"
                className="border p-1 w-full"
            />
            <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                type="password"
                className="border p-1 w-full"
            />
            <button className="bg-green-600 text-white p-2 w-full">Register Admin</button>
        </form>
    );
}
