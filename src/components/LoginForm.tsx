"use client";
import { useState } from "react";
import { useUser } from "@/context/UserContext";
import Link from "next/link";

export default function LoginForm() {
    const user = useUser();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        user?.actions.login(email, password);
    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
                <h2 className="text-2xl font-semibold text-center text-gray-900 mb-6">
                    Welcome back
                </h2>

                <form onSubmit={onSubmit} className="flex flex-col gap-4">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className={`p-3 rounded-lg border ${user?.failedLogin ? "border-red-400" : "border-gray-300"
                            } focus:outline-none focus:ring-2 focus:ring-blue-400`}
                        required
                    />

                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="********"
                        className={`p-3 rounded-lg border ${user?.failedLogin ? "border-red-400" : "border-gray-300"
                            } focus:outline-none focus:ring-2 focus:ring-blue-400`}
                        required
                    />

                    <button
                        type="submit"
                        className="w-full py-3 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition"
                    >
                        Login
                    </button>
                </form>

                {user?.failedLogin && (
                    <p className="text-center text-sm text-red-500 mt-3">
                        Invalid email or password
                    </p>
                )}

                <p className="text-center text-gray-600 text-sm mt-6">
                    Not a user?{" "}
                    <Link
                        href="/register"
                        className="text-blue-500 hover:underline font-medium"
                    >
                        Click here to register
                    </Link>
                </p>
            </div>
        </div>
    )
}