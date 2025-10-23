"use client";
import { useState } from "react";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
const Login = () => {
    const user = useUser();
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        user?.actions.login(email, password);
        router.push('/');
    }

    return (

        <form onSubmit={onSubmit} className="flex flex-col border p-2 w-1/2 items-center">
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="text-center" />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                className="text-center" />
            <button type="submit" className="p-2 rounded-md bg-blue-400 text-white">Login</button>
        </form>

    )
}

export default Login