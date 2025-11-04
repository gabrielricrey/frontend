"use client";
import { useUser } from "@/context/UserContext";
import Link from "next/link";

export default function Profile() {
    const user = useUser();

    return (
        <div className="w-full mt-16 md:mt-20 max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 p-6">

            <div className="flex items-center justify-between mb-6">
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-2xl font-bold">
                    {user?.user?.first_name?.[0] || "U"}
                </div>
                <Link
                    href="/me/update"
                    className="text-blue-500 font-medium hover:underline"
                >
                    Edit profile
                </Link>
            </div>

            <div className="space-y-4">
                <div className="flex gap-2 items-center">
                    <p className="text-gray-600 font-medium">Name:</p>
                    <p className="text-gray-900 text-lg font-medium">
                        {user?.user?.first_name} {user?.user?.last_name}
                    </p>
                </div>

                <div className="flex gap-2 items-center">
                    <p className="text-gray-600 font-medium">Avatar URL:</p>
                    <p className="text-gray-900 text-lg font-medium">
                        {user?.user?.avatar_url}
                    </p>
                </div>
            </div>
        </div>
    );
}
