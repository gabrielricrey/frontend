"use client";
import { useState } from "react";
import AuthService from "@/utils/authService";
import { newUserProfileSchema } from "@/utils/validation/registerUserValidator";
import z from "zod";
import { useRouter } from "next/navigation";
import LoadingSpinner from "../LoadingSpinner";

export default function RegisterForm() {
    
    const [form, setForm] = useState<NewUserProfile>({
        email: "",
        password: "",
        confirm_password: "",
    });
    const [validationErrors, setValidationErrors] = useState<z.core.$ZodIssue[] | [{ message: string }] | null>(null);
    const [isLoading,setIsLoading] = useState<boolean>(false);

    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValidationErrors(null);
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        setIsLoading(true);
        e.preventDefault();
        let response;
        try {
            setValidationErrors(null);
            newUserProfileSchema.parse(form);
            const { email, password } = form;
            response = await new AuthService().register({ email, password });
            setIsLoading(false);
        } catch (err) {
            if (err instanceof z.ZodError) {
                console.log("Validation errors:", err.issues);
                setValidationErrors(err.issues);
                setIsLoading(false);
                return;
            }
            setIsLoading(false);
            return;
        }

        if (response.status === 409) {
            setValidationErrors([{ message: "Email already in use" }])
            setIsLoading(false);
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
            setIsLoading(false);
            throw new Error(error || "Error register user.");
        }
        setIsLoading(false);
        router.push('/login');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
                <h2 className="text-2xl font-semibold text-center text-gray-900 mb-6">
                    Register
                </h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        id="email"
                        name="email"
                        type="text"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Email"
                        required
                        className={`p-3 rounded-lg border border-gray-300
                                focus:outline-none focus:ring-2 focus:ring-blue-400`}
                    />
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Password"
                        required
                        className={`p-3 rounded-lg border border-gray-300
                                focus:outline-none focus:ring-2 focus:ring-blue-400`}
                    />
                    <input
                        id="confirm_password"
                        name="confirm_password"
                        type="password"
                        value={form.confirm_password}
                        onChange={handleChange}
                        placeholder="Confirm Password"
                        required
                        className={`p-3 rounded-lg border border-gray-300
                                focus:outline-none focus:ring-2 focus:ring-blue-400`}
                    />

                    {validationErrors && (
                        <div className="text-center">
                            {validationErrors.map((issue, i) => (
                                <p className="text-sm text-red-500" key={i}>{issue.message}</p>
                            ))}
                        </div>
                    )}


                    <button type="submit" className="w-full py-3 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition">
                        {isLoading ? <LoadingSpinner/> : "Register"}
                    </button>
                </form>
            </div>
        </div>
    );
}
