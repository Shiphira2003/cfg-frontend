import { useState } from "react";
import { registerStudent } from "../api/student.api";
import { useNavigate } from "react-router-dom";

type StudentRegisterForm = {
    email: string;
    password: string;
    full_name: string;
    national_id: string;
    institution: string;
    course: string;
    year_of_study: number;
};

export default function RegisterStudent() {
    const [form, setForm] = useState<StudentRegisterForm>({
        email: "",
        password: "",
        full_name: "",
        national_id: "",
        institution: "",
        course: "",
        year_of_study: 1,
    });

    const navigate = useNavigate();

    const updateField = <K extends keyof StudentRegisterForm>(
        key: K,
        value: StudentRegisterForm[K]
    ) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        await registerStudent(form);
        navigate("/login");
    };

    return (
        <form onSubmit={submit} className="max-w-md mx-auto p-6 space-y-4">
            <input
                placeholder="Email"
                onChange={(e) => updateField("email", e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                onChange={(e) => updateField("password", e.target.value)}
            />
            <input
                placeholder="Full Name"
                onChange={(e) => updateField("full_name", e.target.value)}
            />
            <input
                placeholder="National ID"
                onChange={(e) => updateField("national_id", e.target.value)}
            />
            <input
                placeholder="Institution"
                onChange={(e) => updateField("institution", e.target.value)}
            />
            <input
                placeholder="Course"
                onChange={(e) => updateField("course", e.target.value)}
            />
            <input
                type="number"
                placeholder="Year of Study"
                onChange={(e) =>
                    updateField("year_of_study", Number(e.target.value))
                }
            />
            <button className="bg-blue-600 text-white p-2 w-full">
                Register
            </button>
        </form>
    );
}
