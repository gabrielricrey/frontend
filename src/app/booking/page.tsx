
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

    const data = await response.json();

    console.log("Serverside!", data);

    return (
        <Bookings data={data.bookings} />
    )
}

export default page