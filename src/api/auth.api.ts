import api from "./axios";

export interface LoginResponse {
    token: string;
    user: {
        id: number;
        email: string;
        role: "ADMIN" | "STUDENT" | "COMMITTEE";
    };
}

export const login = async (email: string, password: string) => {
    const res = await api.post<LoginResponse>("/auth/login", {
        email,
        password,
    });
    return res.data;
};
