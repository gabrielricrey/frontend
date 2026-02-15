"use client";
import { useState, useEffect, useMemo } from "react";
import HostBookingCard from "./HostBookingCard";
import HostBookingService from "@/utils/hostBookingService";
import Loading from "../Loading";
import SectionTitle from "../SectionTitle";

export default function HostBookings() {
    const [bookings, setHostBookings] = useState<BookingWithUserAndProperty[] | []>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const hostBookingService = useMemo(() => new HostBookingService(), [])

    useEffect(() => {
        let isMounted = true;

        (async () => {
            try {
                const response = await hostBookingService.getBookings();
                const data = await response.json();
                console.log(data);
                setHostBookings(data.hostBookings);
            } catch (err) {
                if (isMounted) setError("Error loading your bookings");
            } finally {
                if (isMounted) setLoading(false);
            }
        })();

        return () => {
            isMounted = false;
        }

    }, [hostBookingService])

    const updateBookings = (index: number, status: Booking['status']) => {

        const updatedArray = [...bookings];
        updatedArray[index] = { ...updatedArray[index], status };

        setHostBookings(updatedArray);
    }



    return (
        <div className="min-h-screen flex items-start justify-center bg-gray-50 px-4 py-8">
            <div className="w-full max-w-4xl mt-16 md:mt-20 bg-white rounded-2xl shadow-sm border border-gray-200 relative p-8">
                <SectionTitle title={"Your Bookings"} />
                {error &&
                    <p className="text-red-500">{error}</p>
                }
                {loading &&
                    <Loading />
                }
                {!error && !loading &&
                    <ul>
                        {bookings && bookings.map((b, index) => <HostBookingCard booking={b} key={b.id} index={index} updateBookings={updateBookings} />)}
                    </ul>
                }
            </div>
        </div>
    )



}
