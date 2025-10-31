import { cookies } from "next/headers"
import HostProperty from "@/components/property/HostProperty";
import { notFound } from "next/navigation";

type PropertyPageProps = {
    params: {
        id: string,
    }
}

export default async function PropertyPage({ params }: PropertyPageProps) {

    const id = await params.id;
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("sb-wpsscnnnxurgkeoqwgjy-auth-token");
    const baseUrl = process.env.BACKEND_BASE_URL || process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
    const url = `${baseUrl}/host/property/${id}`;

    const response = await fetch(url,
        {
            method: 'GET',
            headers: {
                Cookie: `sb-wpsscnnnxurgkeoqwgjy-auth-token=${sessionCookie?.value}`
            }
        }
    )

    if (response.status === 404) {
        notFound();
    }

    let data;

    try {
        data = await response.json();
    } catch {
        data = null;
    }

    if (!response.ok) {
        const message = data?.message
        throw new Error(message || "Error fetching property");
    }

    return (
        <div className="w-full flex justify-center">
            <HostProperty data={data.property} />
        </div>
    )


}

