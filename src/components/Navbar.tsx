"use client";

import { MagnifyingGlassIcon, Bars3Icon, UserCircleIcon, CalendarDaysIcon, HomeModernIcon } from "@heroicons/react/16/solid"
import { HostModeSwitch } from "./HostModeSwitch"
import { usePathname } from "next/navigation";
import { useUser } from "@/context/UserContext";
import Link from "next/link";
import BecomeHostLabel from "./BecomeHostLabel";
import { useHostMode } from "@/context/HostModeContext";

const Navbar = () => {

    const pathname = usePathname();
    const isRoot = pathname === '/';
    const onBecomeHost = pathname === '/host/become';
    const user = useUser();
    const hostMode = useHostMode();


    return (
        <nav className="w-full h-14 md:h-16 border-b flex justify-center items-center p-2  bg-blue-200 relative z-50">
            <a href="#" className="absolute left-8 top-1/2 transform -translate-y-1/2"><p className="text-2xl text-blue-500 font-bold">Stay</p></a>
            {isRoot &&
                <div className="w-3/4 flex lg:w-1/4 border rounded-md p-2">
                    <MagnifyingGlassIcon className="size-6" />
                    <input type="text" className="w-full text-center" />
                </div>
            }
            <div className="absolute right-8 top-1/2 transform -translate-y-1/2 flex">


                {user?.user && hostMode?.hostMode &&
                    <Link href={'/host/property'} className="hidden md:block">
                        <div className="flex justify-center items-center gap-2">
                            <HomeModernIcon className="size-6" />
                            <p>Properties</p>
                        </div>
                    </Link>
                }
                {user?.user && hostMode?.hostMode &&
                    <Link href={'/host/booking'} className="hidden md:block">
                        <div className="flex justify-center items-center gap-2">
                            <CalendarDaysIcon className="size-6" />
                            <p>Bookings</p>
                        </div>
                    </Link>
                }
                {user?.user && !hostMode?.hostMode &&
                    <Link href={'/'} className="hidden md:block">
                        <div className="flex justify-center items-center gap-2">
                            <MagnifyingGlassIcon className="size-6" />
                            <p>Explore</p>
                        </div>
                    </Link>
                }
                {user?.user && !hostMode?.hostMode &&
                    <Link href={'/booking'} className="hidden md:block">
                        <div className="flex justify-center items-center gap-2">
                            <CalendarDaysIcon className="size-6" />
                            <p>Bookings</p>
                        </div>
                    </Link>
                }
                {user?.user &&
                    <Link href={'/me'} className="hidden md:block">
                        <div className="flex justify-center items-center gap-2">
                            <UserCircleIcon className="size-6" />
                            <p>Profile</p>
                        </div>
                    </Link>
                }
                {!user?.user &&
                    <Link href={'/login'} className="hidden md:block">
                        <div className="flex justify-center items-center gap-2">
                            <UserCircleIcon className="size-6" />
                            <p>Login</p>
                        </div>
                    </Link>
                }
                {user?.user && (
                    user.user.is_host ?
                        <HostModeSwitch />
                        : onBecomeHost ? <></> : <BecomeHostLabel />
                )
                }
                <Bars3Icon className="size-6 border" />
            </div>
        </nav>
    )
}

export default Navbar