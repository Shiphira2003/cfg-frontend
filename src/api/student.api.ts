import api from "./axios";

export const registerStudent = async (data: {
    email: string;
    password: string;
    full_name: string;
    national_id: string;
    institution: string;
    course: string;
    year_of_study: number;
}) => {
    const res = await api.post("/students/register/student", data);
    return res.data;
};
