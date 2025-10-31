import Bookings from "@/components/booking/Bookings";
import { cookies } from "next/headers";

const page = async () => {

    const cookieStore = cookies();
    const sessionCookie = (await cookieStore).get("sb-wpsscnnnxurgkeoqwgjy-auth-token");

    const baseUrl = process.env.BACKEND_BASE_URL || process.env.NEXT_PUBLIC_BACKEND_BASE_URL || "";
    const bookingUrl = `${baseUrl}/booking`

    const response = await fetch(bookingUrl, {
        method: 'GET',
        headers: {
            Cookie: `sb-wpsscnnnxurgkeoqwgjy-auth-token=${sessionCookie?.value}`
        }
    })

    let data;
    try {
        data = await response.json();
    } catch {
        data = null
    }
    if (!response.ok) {
        const message = data?.message;
        throw new Error(message || "Error fetching bookings");
    }

    return (
        <Bookings data={data.bookings} />
    )

}

export default page