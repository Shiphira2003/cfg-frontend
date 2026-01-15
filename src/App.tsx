import RegisterStudent from "./pages/RegisterStudent";
import {Route, Routes} from "react-router-dom";
import Login from "./pages/Login.tsx";
import AdminDashboard from "./pages/AdminDashboard.tsx";

function App() {
    return (
        <Routes>
            <Route path="/register-student" element={<RegisterStudent />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
    )
}

export default App;
