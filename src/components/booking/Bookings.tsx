"use client";
import { useState, useEffect, useMemo } from "react";
import BookingCard from "./BookingCard";
import BookingService from "@/utils/bookingService";

export default function Bookings() {
    const [bookings, setBookings] = useState<BookingWithProperty[] | []>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const bookingService = useMemo(() => new BookingService(), []);

    useEffect(() => {
        let isMounted = true;
        (async () => {
            try {
                const response = await bookingService.getBookings();
                const data = await response.json();
                setBookings(data.bookings);
            } catch (err) {
                if (isMounted) setError("Oops, failed getting yuor bookings");
            } finally {
                if (isMounted) setLoading(false);
            }

        })();

        return () => {
            isMounted = false;
        }
    }, [bookingService]);

    return (
        <div className="w-full flex justify-center px-4 md:px-8 mt-16 md:mt-18">
            <div className="w-full max-w-6xl">
                <h2 className="text-3xl font-semibold text-gray-900 mb-8 text-center">
                    Your Bookings
                </h2>

                {loading && (
                    <div className="flex justify-center items-center h-64">
                        <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                    </div>
                )}

                {error && <p className="text-red-500">{error}</p>}

                {!loading && !error && bookings && bookings.length < 1 && (
                    <p className="text-gray-500 text-center mt-12">
                        You have no bookings yet!
                    </p>
                )}

                {!loading && !error && bookings.length > 0 && (
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
