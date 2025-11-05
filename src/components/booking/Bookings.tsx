"use client";
import { useState, useEffect, useMemo } from "react";
import BookingCard from "./BookingCard";
import BookingService from "@/utils/bookingService";
import Loading from "../Loading";
import SectionTitle from "../SectionTitle";

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
        <div className="min-h-screen flex items-start justify-center bg-gray-50 px-4">
            <div className="w-full max-w-4xl mt-16 md:mt-20 bg-white rounded-2xl shadow-sm border border-gray-200 relative p-4">

                <SectionTitle title={"Your Bookings"} />

                {loading && (
                    <Loading />
                )}

                {error && <p className="text-red-500">{error}</p>}

                {!loading && !error && bookings && bookings.length < 1 && (
                    <p className="text-gray-500 text-center mt-12">
                        You have no bookings yet!
                    </p>
                )}

                {!loading && !error && bookings.length > 0 && (
                    <ul className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
                        {bookings.map((b) => (
                            <BookingCard booking={b} key={b.id} />
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
