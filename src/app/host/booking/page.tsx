import React from 'react'
import { cookies } from 'next/headers'
import HostBookings from '@/components/booking/HostBookings';
import { notFound } from 'next/navigation';

const HostBookingsPage = async () => {
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

    if (response.status === 404) {
        notFound();
    }

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
        <HostBookings data={data.hostBookings} />
    )


}

export default HostBookingsPage