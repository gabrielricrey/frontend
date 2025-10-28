"use client";
import { useState } from "react";
import BookingCard from "./BookingCard";

type BookingsProp = {
    data: Booking[],
}

const Bookings = ({ data }: BookingsProp) => {
    console.log(data);
    const [bookings, setBookings] = useState(data || []);;

    return (
        <div>
            <ul>
                {bookings &&
                    bookings.map(b => <BookingCard booking={b} key={b.id} />)
                }
            </ul>
        </div>
    )




}

export default Bookings