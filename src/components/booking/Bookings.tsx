"use client";
import { useState, useEffect } from "react";
import BookingCard from "./BookingCard";
import BookingService from "@/utils/bookingService";


export default function Bookings() {

    const [bookings, setBookings] = useState<BookingWithProperty[] | null>(null);

    useEffect(() => {
        const fetchBookings = async () => {
            const response = await new BookingService().getBookings();
            const data = await response.json();
            setBookings(data.bookings);
        }

        fetchBookings();
    }, [])

    return (
        <div>
            {bookings && bookings.length < 1 &&
                <h3>You have no bookings yet!</h3>
            }
            <ul>
                {bookings && bookings.length > 0 &&
                    bookings.map(b => <BookingCard booking={b} key={b.id} />)
                }

            </ul>
        </div>
    )

}

