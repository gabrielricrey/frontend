import BookingForm from "@/components/booking/BookingForm";
import Booking from "@/components/booking/Booking";
import { cookies } from "next/headers";

type BookingPageProps = {
    params: {
        id: string;
    }
}

const BookingPage = async ({ params }: BookingPageProps) => {
    const id = params.id;
    try {
        const cookieStore = cookies();
        const sessionCookie = (await cookieStore).get("sb-wpsscnnnxurgkeoqwgjy-auth-token");

        const baseUrl = process.env.BACKEND_BASE_URL || process.env.NEXT_PUBLIC_BACKEND_BASE_URL || "";
        const bookingUrl = `${baseUrl}/booking/${id}`;

        const response = await fetch(bookingUrl, {
            method: 'GET',
            headers: {
                Cookie: `sb-wpsscnnnxurgkeoqwgjy-auth-token=${sessionCookie?.value}`
            }
        })

        if (!response.ok) {
            throw new Error(`Fetch failed with status ${response.status}`);
        }

        const data = await response.json();

        return (
            <div>
                <Booking booking={data.booking} />
            </div>
        )

    } catch (error) {
        console.error("Error fetching bookings:", error);

        return <Booking booking={{}} />;
    }
}

export default BookingPage;