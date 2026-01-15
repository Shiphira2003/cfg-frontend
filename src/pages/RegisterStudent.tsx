// src/pages/RegisterStudent.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerStudent } from "../api/student.api";

import axios from "axios";

type StudentForm = {
    email: string;
    password: string;
    full_name: string;
    national_id: string;
    institution: string;
    course: string;
    year_of_study: number;
};

export default function RegisterStudent() {
    const [form, setForm] = useState<StudentForm>({
        email: "",
        password: "",
        full_name: "",
        national_id: "",
        institution: "",
        course: "",
        year_of_study: 1,
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]:
                name === "year_of_study"
                    ? Number(value)
                    : value, // convert year_of_study to number
        }));
    };

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const data = await registerStudent(form);
            console.log("Registration success:", data);
            alert("Student registered successfully!");
            navigate("/auth/login"); // redirect to login
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.error || "Registration failed");
            } else if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Registration failed");
            }
            console.error("Registration error:", err);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow-md">
            <h1 className="text-2xl font-bold mb-4">Student Registration</h1>

            {error && (
                <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">{error}</div>
            )}

            <form onSubmit={submit} className="space-y-4">
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />

                <input
                    type="text"
                    name="full_name"
                    placeholder="Full Name"
                    value={form.full_name}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />

                <input
                    type="text"
                    name="national_id"
                    placeholder="National ID"
                    value={form.national_id}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />

                <input
                    type="text"
                    name="institution"
                    placeholder="Institution"
                    value={form.institution}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />

                <input
                    type="text"
                    name="course"
                    placeholder="Course"
                    value={form.course}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />

                <input
                    type="number"
                    name="year_of_study"
                    placeholder="Year of Study"
                    min={1}
                    max={6}
                    value={form.year_of_study}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
                >
                    {loading ? "Registering..." : "Register"}
                </button>
            </form>
        </div>
    );
}
