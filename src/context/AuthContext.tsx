import React, { createContext, useContext, useState } from "react";

/* ================= TYPES ================= */

export type User = {
    id: number;
    email: string;
    role: "ADMIN" | "STUDENT" | "COMMITTEE";
};

type AuthContextType = {
    user: User | null;
    loginUser: (token: string, user: User) => void;
    logout: () => void;
};

/* ================= CONTEXT ================= */

export const AuthContext = createContext<AuthContextType | null>(null);

/* ================= PROVIDER ================= */

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

/* ================= HOOK ================= */

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error("useAuth must be used inside AuthProvider");
    }
    return ctx;
}
