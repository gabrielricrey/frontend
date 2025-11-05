import React from 'react'
import HostBookings from '@/components/booking/HostBookings';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';


export default async function HostBookingsPage() {

    const cookieStore = await cookies();
    const hostMode = cookieStore.get("hostMode")?.value === 'true';

    if (!hostMode) {

        redirect('/');
    }


    return (
        <HostBookings />
    )


}
