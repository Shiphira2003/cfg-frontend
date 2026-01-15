import { useState } from "react";
import { login } from "../api/auth.api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { loginUser } = useAuth();
    const navigate = useNavigate();

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await login(email, password);
        loginUser(res.token, res.user);

        if (res.user.role === "ADMIN") navigate("/admin");
        else navigate("/student");
    };

    return (
        <form onSubmit={submit} className="max-w-sm mx-auto p-6">
            <input onChange={e => setEmail(e.target.value)} placeholder="Email" />
            <input type="password" onChange={e => setPassword(e.target.value)} placeholder="Password" />
            <button className="bg-green-600 text-white p-2 w-full">Login</button>
        </form>
    );
}
