// src/pages/RegisterStudent.tsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerStudent } from "../api/student.api";
import { Card } from "../components/Card";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

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
            await registerStudent(form);
            navigate("/auth/login"); // redirect to login
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.error || "Registration failed");
            } else if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Registration failed");
            }
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center mb-6">
                    <div className="h-12 w-12 bg-primary rounded-lg flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold text-2xl">C</span>
                    </div>
                </div>
                <h2 className="mt-2 text-center text-3xl font-extrabold text-text">
                    Create your account
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link to="/auth/login" className="font-medium text-primary hover:text-primary/80">
                        Sign in
                    </Link>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <Card className="py-8 px-4 sm:px-10">
                    <form className="space-y-6" onSubmit={submit}>
                        {error && (
                            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
                                <div className="flex">
                                    <div className="ml-3">
                                        <p className="text-sm text-red-700">{error}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <Input
                            label="Full Name"
                            name="full_name"
                            value={form.full_name}
                            onChange={handleChange}
                            required
                        />

                        <Input
                            label="Email Address"
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />

                        <Input
                            label="National ID"
                            name="national_id"
                            value={form.national_id}
                            onChange={handleChange}
                            required
                        />

                        <Input
                            label="Password"
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />

                        <Input
                            label="Institution"
                            name="institution"
                            value={form.institution}
                            onChange={handleChange}
                            required
                        />

                        <Input
                            label="Course"
                            name="course"
                            value={form.course}
                            onChange={handleChange}
                            required
                        />

                        <Input
                            label="Year of Study"
                            type="number"
                            name="year_of_study"
                            min={1}
                            max={6}
                            value={form.year_of_study}
                            onChange={handleChange}
                            required
                        />

                        <div>
                            <Button
                                type="submit"
                                fullWidth
                                isLoading={loading}
                                variant="primary"
                            >
                                Register
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    );
}
