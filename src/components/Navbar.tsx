import { MagnifyingGlassIcon, Bars3Icon } from "@heroicons/react/16/solid"

const Navbar = () => {
    return (
        <div className="w-full border-b flex justify-center p-2 relative">
            <a href="#" className="absolute left-8 top-1/2 transform -translate-y-1/2">Stay</a>
            <div className="w-3/4 flex lg:w-1/4 border rounded-md p-2">
                <MagnifyingGlassIcon className="size-6" />
                <input type="text" className="w-full text-center" />
            </div>
            <div className="absolute right-8 top-1/2 transform -translate-y-1/2 flex">
                <div className="size-6 border"></div>
                <Bars3Icon className="size-6 border" />
            </div>
        </div>
    )
}

export default Navbar