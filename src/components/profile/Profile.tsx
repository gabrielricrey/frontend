"use client";
import { useUser } from "@/context/UserContext";
import Link from "next/link";
import Logout from "../Logout";

export default function Profile() {
    const user = useUser();

    return (
        <div className="min-h-screen flex items-start justify-center bg-gray-50 px-4 pt-8">
            <div className="w-full max-w-4xl bg-white mt-16 md:mt-20 p-8 rounded-2xl shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                    <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-2xl font-bold">
                        {user?.user?.first_name?.[0] || "U"}
                    </div>
                    <div className="flex gap-2 border rounded-md border-gray-400 p-2">
                        <Logout />
                        <Link
                            href="/me/update"
                            className="text-gray-700 font-medium border-l pl-1 hover:text-blue-500"
                        >
                            Edit profile
                        </Link>
                    </div>
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
        </div>
    );
}
