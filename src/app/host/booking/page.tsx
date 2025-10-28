import React from 'react'
import { cookies } from 'next/headers'
import Bookings from '@/components/booking/Bookings';

const HostBookingsPage = async () => {

    try {
        const cookieStore = cookies();
        const sessionCookie = (await cookieStore).get("sb-wpsscnnnxurgkeoqwgjy-auth-token");

        const baseUrl = process.env.BACKEND_BASE_URL || process.env.NEXT_PUBLIC_BACKEND_BASE_URL || "";
        const bookingUrl = `${baseUrl}/host/booking`

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
        console.log(data);

        return (
            <Bookings bookingWithPropertyAndUSer={data.hostBookings} isHostBookings={true} />
        )

    } catch (error) {
        console.error("Error fetching bookings:", error);

        return <Bookings bookingWithPropertyAndUSer={[]} isHostBookings={true} />;
    }
}

export default HostBookingsPage