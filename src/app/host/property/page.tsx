import { PlusIcon } from "@heroicons/react/16/solid";
import HostProperties from "@/components/property/HostProperties";
import Link from "next/link";

export default async function PropertiesPage() {
    return (
        <div>
            <Link
                href={'/host/property/create'}
                className="flex p-2 border"
            >
                <PlusIcon className="size-6" />
                <span>Create</span>
            </Link>
            <HostProperties />
        </div>
    )


}