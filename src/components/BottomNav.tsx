"use client";
import {
    UserCircleIcon,
    MagnifyingGlassIcon,
    CalendarDaysIcon,
    HomeModernIcon,
} from "@heroicons/react/16/solid";
import { useUser } from "@/context/UserContext";
import { useHostMode } from "@/context/HostModeContext";
import Link from "next/link";

const BottomNav = () => {
    const user = useUser();
    const hostMode = useHostMode();

    return (
        <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t shadow-md z-50">
            <div className="flex justify-around items-center h-16">
                {!hostMode.hostMode && (
                    <Link href="/">
                        <div className="flex flex-col items-center text-gray-700 hover:text-blue-500 transition">
                            <MagnifyingGlassIcon className="w-6 h-6" />
                            <span className="text-xs mt-1">Explore</span>
                        </div>
                    </Link>
                )}

                {user?.user && hostMode.hostMode && (
                    <>
                        <Link href="/host/property">
                            <div className="flex flex-col items-center text-gray-700 hover:text-blue-500 transition">
                                <HomeModernIcon className="w-6 h-6" />
                                <span className="text-xs mt-1">Properties</span>
                            </div>
                        </Link>

                        <Link href="/host/booking">
                            <div className="flex flex-col items-center text-gray-700 hover:text-blue-500 transition">
                                <CalendarDaysIcon className="w-6 h-6" />
                                <span className="text-xs mt-1">Bookings</span>
                            </div>
                        </Link>
                    </>
                )}

                {user?.user && !hostMode.hostMode && (
                    <Link href="/booking">
                        <div className="flex flex-col items-center text-gray-700 hover:text-blue-500 transition">
                            <CalendarDaysIcon className="w-6 h-6" />
                            <span className="text-xs mt-1">Bookings</span>
                        </div>
                    </Link>
                )}

                {user?.user ? (
                    <Link href="/me">
                        <div className="flex flex-col items-center text-gray-700 hover:text-blue-500 transition">
                            <UserCircleIcon className="w-6 h-6" />
                            <span className="text-xs mt-1">Profile</span>
                        </div>
                    </Link>
                ) : (
                    <Link href="/login">
                        <div className="flex flex-col items-center text-gray-700 hover:text-blue-500 transition">
                            <UserCircleIcon className="w-6 h-6" />
                            <span className="text-xs mt-1">Login</span>
                        </div>
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default BottomNav;
