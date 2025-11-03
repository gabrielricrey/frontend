"use client";
import { useState } from "react";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import UserService from "@/utils/userService";

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

        const data = await response.json();
        const updatedUserData: UserProfile = data.profile;
        user?.setUser(updatedUserData);
        router.push('/me');
    }

    return (
        <form onSubmit={onSubmit}>
            <div>
                <label htmlFor="first_name"> First name:
                    <input type="text" name="first_name" value={form.first_name} onChange={handleChange} />
                </label>
            </div>
            <div>
                <label htmlFor="lastName"> Last name:
                    <input type="last_name" name="last_name" value={form.last_name} onChange={handleChange} />
                </label>
            </div>
            <div>
                <label htmlFor="imageUrl"> Image URL:
                    <input type="avatar_url" name="avatar_url" value={form.avatar_url} onChange={handleChange} />
                </label>
            </div>
            <button type="submit">Update</button>
        </form>
    )
}