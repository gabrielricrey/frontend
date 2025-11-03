"use client";
import { useUser } from "@/context/UserContext";
import Link from "next/link";

export default function Profile() {

    const user = useUser();

    return (
        <div className="w-full md:w-3/4 flex flex-col border">
            <div className="flex">
                <div className="border rounded-md w-5 h-5">

                </div>
                <div>
                    <Link href={'/me/update'}>Edit profile</Link>
                </div>
            </div>
            <div>
                <div>
                    <p>Name: <span>{user?.user?.first_name} {user?.user?.last_name}</span></p>
                </div>
            </div>
        </div>
    )
}