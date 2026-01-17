import RegisterStudent from "./pages/RegisterStudent";
import LandingPage from "./pages/LandingPage";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login.tsx";
import AdminDashboard from "./pages/AdminDashboard.tsx";
// @ts-ignore
import ApplicationAuditLogs from "./pages/admin/ApplicationAuditLogs.tsx";
import StudentApplication from "./pages/StudentApplication.tsx";
import StudentLayout from "./layouts/StudentLayout";
import ProtectedStudentRoute from "./routes/ProtectedStudentRoute";
import StudentDashboard from "./pages/student/StudentDashboard";
import MyApplications from "./pages/student/MyApplications";
import Profile from "./pages/student/Profile";
import { Navigate } from "react-router-dom";

function App() {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/register-student" element={<RegisterStudent />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route
                path="/admin/applications/:id/audit-logs"
                element={<ApplicationAuditLogs />}
            />

            {/* Student Portal Routes */}
            <Route element={<ProtectedStudentRoute />}>
                <Route path="/student" element={<StudentLayout />}>
                    <Route index element={<Navigate to="dashboard" replace />} />
                    <Route path="dashboard" element={<StudentDashboard />} />
                    <Route path="applications" element={<MyApplications />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="apply" element={<StudentApplication />} />
                </Route>
            </Route>

        </Routes>
    )
}

export default App;
