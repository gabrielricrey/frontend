import { cookies } from "next/headers"
import HostProperties from "@/components/property/HostProperties";

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
            <HostProperties data={data.properties} />
        )
    } catch (error) {
        console.error("Error:", error);
        return (
            <HostProperties data={[]} />
        )

    }

}