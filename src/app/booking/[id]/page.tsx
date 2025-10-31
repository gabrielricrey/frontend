import BookingForm from "@/components/booking/BookingForm";
import Booking from "@/components/booking/Booking";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

type BookingPageProps = {
    params: {
        id: string;
    }
}

const BookingPage = async ({ params }: BookingPageProps) => {
    const id = params.id;
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
        const message = data?.message;
        throw new Error(message || "Error fetching booking");
    }

    return (
        <div>
            <Booking booking={data.booking} />
        </div>
    )
}


export default BookingPage;