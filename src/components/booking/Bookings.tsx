"use client";
import { useState } from "react";
import BookingCard from "./BookingCard";

type BookingsProp = {
    data: BookingWithProperty[],
}

const Bookings = ({ data }: BookingsProp) => {
    console.log(data);
    const [bookings, setBookings] = useState(data || []);;

    return (
        <div>
            {bookings.length < 1 &&
                <h3>You have no bookings yet!</h3>
            }
            <ul>
                {bookings.length > 0 &&
                    bookings.map(b => <BookingCard booking={b} key={b.id} />)
                }

            </ul>
        </div>
    )

}

export default Bookings