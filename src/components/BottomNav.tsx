"use client";
import { UserCircleIcon, MagnifyingGlassIcon, CalendarDaysIcon, HomeModernIcon } from "@heroicons/react/16/solid"
import { useUser } from "@/context/UserContext"
import { useHostMode } from "@/context/HostModeContext";
import Link from "next/link";

const BottomNav = () => {
    const user = useUser();
    const hostMode = useHostMode();
    return (
        <div className="md:hidden flex absolute bottom-0 w-full justify-around p-2 border-t bg-white">
            {!hostMode.hostMode &&
                <Link href={'/'}>
                    <div className="flex flex-col items-center">
                        <MagnifyingGlassIcon className="size-6" />
                        <p>Explore</p>
                    </div>
                </Link>
            }
            {user.user && hostMode.hostMode &&
                <Link href={'/host/property'}>
                    <div className="flex flex-col items-center">
                        <HomeModernIcon className="size-6" />
                        <p>Properties</p>
                    </div>
                </Link>
            }
            {user.user && hostMode.hostMode &&
                <Link href={'/host/booking'}>
                    <div className="flex flex-col items-center">
                        <CalendarDaysIcon className="size-6" />
                        <p>Bookings</p>
                    </div>
                </Link>
            }
            {user.user && !hostMode.hostMode &&
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