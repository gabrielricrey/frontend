"use client";
import { useState, useEffect } from "react";
import BookingCard from "./BookingCard";
import BookingService from "@/utils/bookingService";

export default function Bookings() {
    const [bookings, setBookings] = useState<BookingWithProperty[] | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await new BookingService().getBookings();
                const data = await response.json();
                setBookings(data.bookings || []);
            } catch (err) {
                console.error("Failed to fetch bookings", err);
                setBookings([]);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    return (
        <div className="w-full flex justify-center px-4 md:px-8 mt-16 md:mt-18">
            <div className="w-full max-w-6xl">
                <h2 className="text-3xl font-semibold text-gray-900 mb-8 text-center">
                    Your Bookings
                </h2>

                {loading && (
                    <p className="text-gray-500 text-center mt-12 animate-pulse">
                        Loading your bookings...
                    </p>
                )}

                {!loading && bookings && bookings.length < 1 && (
                    <p className="text-gray-500 text-center mt-12">
                        You have no bookings yet!
                    </p>
                )}

                {!loading && bookings && bookings.length > 0 && (
                    <ul className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {bookings.map((b) => (
                            <BookingCard booking={b} key={b.id} />
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
