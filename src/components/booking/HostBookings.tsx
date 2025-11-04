"use client";
import { useState, useEffect } from "react";
import HostBookingCard from "./HostBookingCard";
import HostBookingService from "@/utils/hostBookingService";

export default function HostBookings() {
    const [bookings, setHostBookings] = useState<BookingWithUserAndProperty[] | []>([]);

    useEffect(() => {
        const fetchBookings = async () => {
            const response = await new HostBookingService().getBookings();
            const data = await response.json();
            console.log(data);
            setHostBookings(data.hostBookings);
        }

        fetchBookings();
    }, [])


    const updateBookings = (index: number, status: string) => {

        const updatedArray = [...bookings];
        if (status === 'confirmed') {
            updatedArray[index] = { ...updatedArray[index], status: 'confirmed' };
        } else {
            updatedArray.splice(index, 1)
        }

        setHostBookings(updatedArray);
    }



    return (
        <div className="mt-16 md:mt-20">
            <ul>
                {bookings && bookings.map((b, index) => <HostBookingCard booking={b} key={b.id} index={index} updateBookings={updateBookings} />)}
            </ul>
        </div>
    )



}
