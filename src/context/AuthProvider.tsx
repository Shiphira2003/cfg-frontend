import { useState } from "react";
import { AuthContext } from "./AuthContext";
import type { User } from "./AuthContext";

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(() => {
        const stored = localStorage.getItem("cfg_user");
        return stored ? JSON.parse(stored) : null;
    });

    const loginUser = (token: string, user: User) => {
        localStorage.setItem("cfg_token", token);
        localStorage.setItem("cfg_user", JSON.stringify(user));
        setUser(user);
    };

    const logout = () => {
        localStorage.clear();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loginUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
