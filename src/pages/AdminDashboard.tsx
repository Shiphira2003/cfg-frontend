import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getApplications, updateApplicationStatus, registerAdmin } from "../api/admin.api";
import { Card } from "../components/Card";
import { Badge } from "../components/Badge";
import { Button } from "../components/Button";
import { TableContainer, TableHead, TableBody, TableRow, TableHeaderCell, TableCell } from "../components/Table";

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
    const navigate = useNavigate();
    const [applications, setApplications] = useState<Application[]>([]);
    const [statusFilter, setStatusFilter] = useState<string>("PENDING");

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

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-text">Admin Portal</h1>
            </div>

            {/* Stats Cards (Optional placeholder) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <div className="pb-2">
                        <h3 className="text-sm font-medium text-gray-500">Total Applications</h3>
                    </div>
                    <div className="text-2xl font-bold text-text">{applications.length}</div>
                </Card>
                <Card>
                    <div className="pb-2">
                        <h3 className="text-sm font-medium text-gray-500">Pending Review</h3>
                    </div>
                    <div className="text-2xl font-bold text-yellow-600">
                        {applications.filter(a => a.status === 'PENDING').length}
                    </div>
                </Card>
                <Card>
                    <div className="pb-2">
                        <h3 className="text-sm font-medium text-gray-500">Approved</h3>
                    </div>
                    <div className="text-2xl font-bold text-green-600">
                        {applications.filter(a => a.status === 'APPROVED').length}
                    </div>
                </Card>
            </div>

            <Card noPadding className="overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <div className="flex items-center gap-2">
                        <label className="text-sm font-medium text-gray-700">Filter Status:</label>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="border-gray-300 rounded-md text-sm focus:ring-primary focus:border-primary shadow-sm"
                        >
                            <option value="">All Applications</option>
                            <option value="PENDING">Pending</option>
                            <option value="APPROVED">Approved</option>
                            <option value="REJECTED">Rejected</option>
                        </select>
                    </div>
                </div>

                <TableContainer>
                    <TableHead>
                        <TableRow>
                            <TableHeaderCell>Name</TableHeaderCell>
                            <TableHeaderCell>Institution</TableHeaderCell>
                            <TableHeaderCell>Course</TableHeaderCell>
                            <TableHeaderCell>Amount</TableHeaderCell>
                            <TableHeaderCell>Status</TableHeaderCell>
                            <TableHeaderCell>Documents</TableHeaderCell>
                            <TableHeaderCell>Actions</TableHeaderCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {applications.length > 0 ? (
                            applications.map((app) => (
                                <TableRow key={app.id}>
                                    <TableCell className="font-medium text-gray-900">{app.full_name}</TableCell>
                                    <TableCell>{app.institution}</TableCell>
                                    <TableCell>
                                        <div>{app.course}</div>
                                        <div className="text-xs text-gray-500">Year {app.year_of_study}</div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="font-medium">REQ: {app.amount_requested}</div>
                                        {app.amount_allocated > 0 && (
                                            <div className="text-xs text-green-600">ALL: {app.amount_allocated}</div>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={
                                            app.status === 'APPROVED' ? 'success' :
                                                app.status === 'REJECTED' ? 'error' : 'warning'
                                        }>
                                            {app.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col space-y-1">
                                            {app.document_url.map((url, idx) => (
                                                <a
                                                    key={idx}
                                                    href={`http://localhost:5000/${url}`}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="text-primary hover:text-primary/80 text-xs hover:underline flex items-center gap-1"
                                                >
                                                    <span className="w-4 h-4 inline-flex items-center justify-center rounded bg-primary/10">📄</span>
                                                    Doc {idx + 1}
                                                </a>
                                            ))}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            {app.status === "PENDING" && (
                                                <>
                                                    <Button
                                                        size="sm"
                                                        variant="action"
                                                        onClick={() => handleStatusChange(app.id, "APPROVED")}
                                                    >
                                                        Approve
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="danger"
                                                        onClick={() => handleStatusChange(app.id, "REJECTED")}
                                                    >
                                                        Reject
                                                    </Button>
                                                </>
                                            )}

                                            {app.status === "APPROVED" && (
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => navigate(`/admin/applications/${app.id}/audit-logs`)}
                                                >
                                                    View Logs
                                                </Button>
                                            )}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                                    No applications found matching your criteria.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </TableContainer>
            </Card>

            {/* Register Admin Section */}
            <div className="mt-8">
                <Card>
                    <h2 className="text-lg font-semibold text-text mb-4">Register New Admin</h2>
                    <AdminRegisterForm onRegister={fetchApplications} />
                </Card>
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
