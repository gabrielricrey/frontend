"use client";

import { MagnifyingGlassIcon, Bars3Icon, UserCircleIcon } from "@heroicons/react/16/solid"
import { HostModeSwitch } from "./HostModeSwitch"
import { usePathname } from "next/navigation";
import { useUser } from "@/context/UserContext";
import Link from "next/link";

const Navbar = () => {

    const pathname = usePathname();
    const isRoot = pathname === '/';
    const user = useUser();
    return (
        <nav className="w-full h-14 md:h-16 border-b flex justify-center items-center p-2 relative">
            <a href="#" className="absolute left-8 top-1/2 transform -translate-y-1/2">Stay</a>
            {isRoot &&
                <div className="w-3/4 flex lg:w-1/4 border rounded-md p-2">
                    <MagnifyingGlassIcon className="size-6" />
                    <input type="text" className="w-full text-center" />
                </div>
            }
            <div className="absolute right-8 top-1/2 transform -translate-y-1/2 flex">
                {user.user &&
                    <HostModeSwitch />
                }
                {user.user &&
                    <Link href={'/me'} className="hidden md:block">
                        <div className="flex flex-col items-center">
                            <UserCircleIcon className="size-6" />
                            <p>Profile</p>
                        </div>
                    </Link>
                }
                {!user.user &&
                    <Link href={'/login'} className="hidden md:block">
                        <div className="flex flex-col items-center">
                            <UserCircleIcon className="size-6" />
                            <p>Login</p>
                        </div>
                    </Link>
                }
                <Bars3Icon className="size-6 border" />
            </div>
        </nav>
    )
}

export default Navbar