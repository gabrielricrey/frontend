"use client";
import { UserCircleIcon, MagnifyingGlassIcon, CalendarDaysIcon } from "@heroicons/react/16/solid"
import { useUser } from "@/context/UserContext"
import Link from "next/link";

const BottomNav = () => {
    const user = useUser();
    return (
        <div className="md:hidden flex absolute bottom-0 w-full justify-around p-2 border-t bg-white">
            <Link href={'/'}>
                <div className="flex flex-col items-center">
                    <MagnifyingGlassIcon className="size-6" />
                    <p>Explore</p>
                </div>
            </Link>
            {user.user &&
                <Link href={'/booking'}>
                    <div className="flex flex-col items-center">
                        <CalendarDaysIcon className="size-6" />
                        <p>Bookings</p>
                    </div>
                </Link>
            }
            {user.user &&
                <Link href={'/me'}>
                    <div className="flex flex-col items-center">
                        <UserCircleIcon className="size-6" />
                        <p>Profile</p>
                    </div>
                </Link>
            }
            {!user.user &&
                <Link href={'/login'}>
                    <div className="flex flex-col items-center">
                        <UserCircleIcon className="size-6" />
                        <p>Login</p>
                    </div>
                </Link>
            }
        </div>
    )
}

export default BottomNav