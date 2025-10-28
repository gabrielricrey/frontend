"use client";
import { useState } from "react";
import HostBookingCard from "./HostBookingCard";


type HostBookingsProp = {
    data: BookingWithUserAndProperty[];
}

const HostBookings = ({ data }: HostBookingsProp) => {
    const [bookings, setHostBookings] = useState(data || []);

    const updateBookings = (index: number, status: string) => {

        const updatedArray = [...bookings];
        if (status === 'confirmed') {
            updatedArray[index] = { ...updatedArray[index], status: 'confirmed' };
        } else {
            updatedArray.splice(index, 1)
        }

        setHostBookings(updatedArray);

    }

    console.log(data);
    return (
        <div>
            <ul>
                {bookings.map((b, index) => <HostBookingCard booking={b} key={b.id} index={index} updateBookings={updateBookings} />)}
            </ul>
        </div>
    )



}

export default HostBookings