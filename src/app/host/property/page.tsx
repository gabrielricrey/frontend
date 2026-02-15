import { PlusIcon } from "@heroicons/react/16/solid";
import HostProperties from "@/components/property/HostProperties";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import SectionTitle from "@/components/SectionTitle";

export default async function PropertiesPage() {
    const cookieStore = await cookies();
    const hostMode = cookieStore.get("hostMode")?.value === 'true';

    if (!hostMode) {
        redirect('/');
    }

    return (
        <div className="min-h-screen flex items-start justify-center bg-gray-50 px-4 py-8">
            <div className="w-full max-w-4xl mt-16 md:mt-20 bg-white p-8 rounded-2xl shadow-sm border border-gray-200 relative">
                <div className="flex justify-between items-start">
                    <SectionTitle title={"Your properties"} />
                    <Link
                        href={'/host/property/create'}
                        className="p-2 inline-flex border rounded-lg text-white bg-black hover:cursor-pointer items-center gap-2"
                    >
                        <PlusIcon className="size-5 text-white" />
                        <span>Create Property</span>
                    </Link>
                </div>
                <HostProperties />
            </div>
        </div >
    )


}