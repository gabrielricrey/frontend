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
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
                <h2 className="text-2xl font-semibold text-center text-gray-900 mb-6">
                    Profile details
                </h2>
                <form
                    onSubmit={onSubmit}
                    className="flex flex-col gap-4"
                >

                    <input
                        id="first_name"
                        name="first_name"
                        type="text"
                        value={form.first_name}
                        onChange={handleChange}
                        placeholder="First Name"
                        className={`p-3 rounded-lg border border-gray-300
                                focus:outline-none focus:ring-2 focus:ring-blue-400`}
                    />



                    <input
                        id="last_name"
                        name="last_name"
                        type="text"
                        value={form.last_name}
                        onChange={handleChange}
                        placeholder="Last Name"
                        className={`p-3 rounded-lg border border-gray-300
                                focus:outline-none focus:ring-2 focus:ring-blue-400`}
                    />



                    <input
                        id="avatar_url"
                        name="avatar_url"
                        type="text"
                        value={form.avatar_url}
                        onChange={handleChange}
                        placeholder="Avatar URL"
                        className={`p-3 rounded-lg border border-gray-300
                                focus:outline-none focus:ring-2 focus:ring-blue-400`}
                    />


                    <button
                        type="submit"
                        className="w-full py-3 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition"
                    >
                        Update
                    </button>
                </form>
            </div>
        </div>

    )
}