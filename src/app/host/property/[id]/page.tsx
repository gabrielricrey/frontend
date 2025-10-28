import { cookies } from "next/headers"

type PropertyPageProps = {
    params: {
        id: string,
    }
}

export default async function PropertyPage({ params }: PropertyPageProps) {
    try {
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

        if (!response.ok) {
            throw new Error("Error fetching property");
        }

        const data = await response.json();
        console.log(data);


        return (
            <>
                <h3>Property</h3>
            </>
        )

    } catch (error) {

    }

}