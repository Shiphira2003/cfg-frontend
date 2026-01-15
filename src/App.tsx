import RegisterStudent from "./pages/RegisterStudent";
import {Route, Routes} from "react-router-dom";
import Login from "./pages/Login.tsx";

function App() {
    return (
        <Routes>
            <Route path="/register-student" element={<RegisterStudent />} />
            <Route path="/auth/login" element={<Login />} />
        </Routes>
    )
}

export default App;
