import { UserCircleIcon, MagnifyingGlassIcon } from "@heroicons/react/16/solid"

const BottomNav = () => {
    return (
        <div className="sm:hidden flex absolute bottom-0 w-full justify-around p-2 border-t">
            <div className="flex flex-col items-center">
                <MagnifyingGlassIcon className="size-6" />
                <p>Explore</p>
            </div>
            <div className="flex flex-col items-center">
                <UserCircleIcon className="size-6" />
                <p>Profile</p>
            </div>
        </div>
    )
}

export default BottomNav