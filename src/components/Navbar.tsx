"use client";

import {
    MagnifyingGlassIcon,
    Bars3Icon,
    UserCircleIcon,
    CalendarDaysIcon,
    HomeModernIcon,
} from "@heroicons/react/16/solid";
import { HostModeSwitch } from "./HostModeSwitch";
import { usePathname } from "next/navigation";
import { useUser } from "@/context/UserContext";
import Link from "next/link";
import BecomeHostLabel from "./BecomeHostLabel";
import { useHostMode } from "@/context/HostModeContext";
import { PropsWithChildren } from "react";
import clsx from "clsx";

const Navbar = ({ children }: PropsWithChildren) => {
    const pathname = usePathname();
    const isRoot = pathname === "/";
    const onBecomeHost = pathname === "/host/become";
    const user = useUser();
    const hostMode = useHostMode();

    return (
        <>
            <nav className={clsx("fixed top-0 left-0 w-full h-14 md:h-16 shadow-sm flex items-center justify-between px-6 md:px-10 z-50", hostMode.hostMode ? "bg-gray-400" : "bg-white")}>
                {/* Logo */}
                <Link href="/" className="flex items-center gap-1">
                    <p className="text-2xl font-bold text-black tracking-tight">Stay{hostMode.hostMode && <span className="text-blue-500">host</span>}</p>
                </Link>

                {/* Search (only on root) */}
                {isRoot && (
                    <div className="hidden sm:flex items-center gap-2 border rounded-full px-4 py-2 shadow-sm hover:shadow-md transition w-1/2 md:w-1/3">
                        <MagnifyingGlassIcon className="w-5 h-5 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search destinations"
                            className="w-full text-sm focus:outline-none text-gray-700 placeholder-gray-400"
                        />
                    </div>
                )}

                {/* Right side */}
                <div className="flex items-center gap-4 text-sm font-medium text-gray-700">
                    {user?.user && hostMode?.hostMode && (
                        <>
                            <Link href="/host/property" className="hidden md:flex items-center gap-1 hover:text-blue-500">
                                <HomeModernIcon className="w-5 h-5" />
                                <span>Properties</span>
                            </Link>
                            <Link href="/host/booking" className="hidden md:flex items-center gap-1 hover:text-blue-500">
                                <CalendarDaysIcon className="w-5 h-5" />
                                <span>Bookings</span>
                            </Link>
                        </>
                    )}

                    {user?.user && !hostMode?.hostMode && (
                        <>
                            <Link href="/" className="hidden md:flex items-center gap-1 hover:text-blue-500">
                                <MagnifyingGlassIcon className="w-5 h-5" />
                                <span>Explore</span>
                            </Link>
                            <Link href="/booking" className="hidden md:flex items-center gap-1 hover:text-blue-500">
                                <CalendarDaysIcon className="w-5 h-5" />
                                <span>Bookings</span>
                            </Link>
                        </>
                    )}

                    {user?.user ? (
                        <Link href="/me" className="hidden md:flex items-center gap-1 hover:text-blue-500">
                            <UserCircleIcon className="w-5 h-5" />
                            <span>{user.user.first_name ? user.user.first_name : "Profile"}</span>
                        </Link>
                    ) : (
                        <Link href="/login" className="hidden md:flex items-center gap-1 hover:text-blue-500">
                            <UserCircleIcon className="w-5 h-5" />
                            <span>Login</span>
                        </Link>
                    )}

                    {user?.user &&
                        (user.user.is_host ? (
                            <HostModeSwitch />
                        ) : !onBecomeHost && (
                            <BecomeHostLabel />
                        ))}


                </div>
            </nav>
            {children}
        </>
    );
};

export default Navbar;
