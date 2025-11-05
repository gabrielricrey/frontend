import { PlusIcon } from "@heroicons/react/16/solid";
import HostProperties from "@/components/property/HostProperties";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function PropertiesPage() {
    const cookieStore = await cookies();
    const hostMode = cookieStore.get("hostMode")?.value === 'true';

    if (!hostMode) {

        redirect('/');
    }
    return (
        <div className="min-h-screen flex items-start justify-center bg-gray-50 px-4">
            <div className="w-full max-w-4xl mt-16 md:mt-20 bg-white p-4 rounded-2xl shadow-sm border border-gray-200 relative">
                <Link
                    href={'/host/property/create'}
                    className="p-2 inline-flex border absolute right-5 top-5 rounded-lg text-white bg-blue-500 items-center gap-2"
                >
                    <PlusIcon className="size-5 text-white" />
                    <span>Create Property</span>
                </Link>
                <HostProperties />
            </div>
        </div >
    )


}