"use client";
import { useState } from "react";
import AuthService from "@/utils/authService";
import { newUserProfileSchema } from "@/utils/validation/registerUserValidator";
import z from "zod";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
    const [form, setForm] = useState<NewUserProfile>({
        email: "",
        password: "",
        confirm_password: "",
    });
    const [validationErrors, setValidationErrors] = useState<z.core.$ZodIssue[] | [{ message: string }] | null>(null);

    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        let response;
        try {
            setValidationErrors(null);
            newUserProfileSchema.parse(form);
            const { email, password } = form;
            response = await new AuthService().register({ email, password });
        } catch (err) {
            if (err instanceof z.ZodError) {
                console.log("Validation errors:", err.issues);
                setValidationErrors(err.issues);
                return;
            }
            return;
        }

        if (response.status === 409) {
            setValidationErrors([{ message: "Email already in use" }])
            return;
        }

        let data;
        try {
            data = await response.json();
        } catch {
            data = null;
        }

        if (!response.ok) {
            const error = data?.error;
            throw new Error(error || "Error register user.");
        }
        console.log(data);
        router.push('/login');
    };

    return (
        <>
            {validationErrors && (
                <div className="mb-4 p-3 border border-red-300 rounded bg-red-50">
                    {validationErrors.map((issue, i) => (
                        <p className="text-red-700" key={i}>{issue.message}</p>
                    ))}
                </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4 max-w-md">


                <div>
                    <label htmlFor="email" className="block">Email *</label>
                    <input
                        id="email"
                        name="email"
                        type="text"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="border p-2 rounded w-full"
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block">Password *</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        className="border p-2 rounded w-full"
                    />
                </div>

                <div>
                    <label htmlFor="confirm_password" className="block">Confirm Password *</label>
                    <input
                        id="confirm_password"
                        name="confirm_password"
                        type="password"
                        value={form.confirm_password}
                        onChange={handleChange}
                        required
                        className="border p-2 rounded w-full"
                    />
                </div>

                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Register
                </button>
            </form>
        </>
    );
}
