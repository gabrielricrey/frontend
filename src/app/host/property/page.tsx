import { PlusIcon } from "@heroicons/react/16/solid";
import HostProperties from "@/components/property/HostProperties";
import Link from "next/link";

export default async function PropertiesPage() {
    return (
        <div className="mt-16 md:mt-20 relative">
            <Link
                href={'/host/property/create'}
                className=" p-2 inline-flex border absolute right-5 top-5 rounded-md items-center "
            >
                <PlusIcon className="size-5 text-gray-700" />
                <span>Create Property</span>
            </Link>
            <HostProperties />
        </div>
    )


}