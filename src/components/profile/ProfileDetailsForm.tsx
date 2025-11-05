"use client";
import { useState } from "react";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import UserService from "@/utils/userService";
import { toast } from "react-toastify";

export default function ProfileDetailsForm() {
    const user = useUser();

    const [form, setForm] = useState<Pick<UserProfile, "first_name" | "last_name" | "avatar_url">>({ first_name: user?.user?.first_name || "", last_name: user?.user?.last_name || "", avatar_url: user?.user?.avatar_url || "" })

    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }


    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const response = await new UserService().editUserProfile(form);

        if (!response.ok) {
            throw new Error("Error updating profile");
        }

        toast.success("Success updating profile details");
        const data = await response.json();
        const updatedUserData: UserProfile = data.profile;
        user?.setUser(updatedUserData);
        router.push('/me');
    }

    return (

        <form
            onSubmit={onSubmit}
            className="w-full max-w-md bg-white shadow-md rounded-2xl p-6 flex flex-col gap-6"
        >
            <div className="flex flex-col">
                <label htmlFor="first_name" className="mb-1 font-medium">
                    First name
                </label>
                <input
                    id="first_name"
                    name="first_name"
                    type="text"
                    value={form.first_name}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>

            <div className="flex flex-col">
                <label htmlFor="last_name" className="mb-1 font-medium">
                    Last name
                </label>
                <input
                    id="last_name"
                    name="last_name"
                    type="text"
                    value={form.last_name}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>

            <div className="flex flex-col">
                <label htmlFor="avatar_url" className="mb-1 font-medium">
                    Image URL
                </label>
                <input
                    id="avatar_url"
                    name="avatar_url"
                    type="text"
                    value={form.avatar_url}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>

            <button
                type="submit"
                className="mt-2 bg-blue-500 text-white font-medium py-2 rounded-lg hover:bg-blue-600 transition"
            >
                Update
            </button>
        </form>

    )
}