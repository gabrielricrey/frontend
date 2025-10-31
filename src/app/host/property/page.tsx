import { cookies } from "next/headers"
import { PlusIcon } from "@heroicons/react/16/solid";
import HostProperties from "@/components/property/HostProperties";
import Link from "next/link";

export default async function PropertiesPage() {
    try {

        const cookieStore = await cookies();
        const sessionCookie = cookieStore.get("sb-wpsscnnnxurgkeoqwgjy-auth-token");
        const baseUrl = process.env.BACKEND_BASE_URL || process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
        const url = `${baseUrl}/host/property`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Cookie: `sb-wpsscnnnxurgkeoqwgjy-auth-token=${sessionCookie?.value}`
            }
        })

        if (!response.ok) {
            throw new Error("Error fetching properties");
        }

        const data = await response.json();
        console.log(data);
        return (
            <div>
                <Link
                    href={'/host/property/create'}
                    className="flex p-2 border"
                >
                    <PlusIcon className="size-6" />
                    <span>Create</span>
                </Link>
                <HostProperties data={data.properties} />
            </div>
        )
    } catch (error) {
        console.error("Error:", error);
        return (
            <div className="mt-14 md:mt-16">
                {/* <HostProperties data={[]} /> */}
                <p>Error getting properties</p>
            </div>
        )

    }

}