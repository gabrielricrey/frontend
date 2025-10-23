"use client";
import { useState, useEffect } from "react";
import BookingService from "@/utils/bookingService";
import BookingCard from "./BookingCard";

type BookingsProp = {
    data: Booking[]
}

const Bookings = ({ data }: BookingsProp) => {
    const bookings = data;

    return (
        <div>
            <ul>
                {bookings.map(b => <BookingCard booking={b} key={b.id} />)}
            </ul>
        </div>
    )
}

export default Bookings