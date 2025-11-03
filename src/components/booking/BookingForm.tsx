"use client";
import { useState } from "react";
import BookingService from "@/utils/bookingService";
import { useUser } from "@/context/UserContext";

type BookingFormProps = {
    propertyId?: string;
    bookingId?: string;
    checkInDate?: string;
    checkOutDate?: string;
    propertyUserId?: string;
}

const BookingForm = ({ propertyId, bookingId, checkInDate: checkIn, checkOutDate: checkOut, propertyUserId }: BookingFormProps) => {

    const [checkInDate, setCheckInDate] = useState<string>(checkIn || "");
    const [checkOutDate, setCheckOutDate] = useState<string>(checkOut || "");

    const user = useUser();

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!bookingId) {
            try {
                const response = await new BookingService().createBooking(propertyId!, checkInDate, checkOutDate);
                if (!response.ok) {
                    throw new Error("Error create booking");

                }
                const data = await response.json();
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                const response = await new BookingService().updateBooking({ bookingId, checkInDate, checkOutDate });
                if (!response.ok) {
                    console.log(response);
                    throw new Error("Error update booking");

                }
                const data = await response.json();
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        }


    }
    return (
        <>
            {user?.user ? (
                user?.user.id !== propertyUserId ?
                    <form onSubmit={onSubmit}>
                        <label>
                            Check-in
                            <input
                                type="date"
                                value={checkInDate}
                                min={new Date().toISOString().split("T")[0]}
                                onChange={(e) => setCheckInDate(e.target.value)}
                                className="border p-2 rounded w-full"
                            />
                        </label>
                        <label>
                            Check-out
                            <input
                                type="date"
                                value={checkOutDate}
                                min={checkInDate}
                                onChange={(e) =>
                                    setCheckOutDate(e.target.value)
                                }
                                className="border p-2 rounded w-full"
                            />
                        </label>
                        <button className="bg-blue-500 text-white p-2 rounded-md" type="submit">{bookingId ? "Update" : "Book"}</button>
                    </form> : <p>your own property</p>) :

                !user?.user &&
                <p>Sign in to be able to book!</p>

            }

        </>
    )
}

export default BookingForm