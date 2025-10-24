"use client";
import { useState } from "react";
import BookingService from "@/utils/bookingService";

type BookingFormProps = {
    propertyId?: string;
    bookingId?: string;
    checkInDate?: string;
    checkOutDate?: string;
    updateBooking?: boolean
}

const BookingForm = ({ propertyId, bookingId, checkInDate: checkIn, checkOutDate: checkOut, updateBooking }: BookingFormProps) => {

    const [checkInDate, setCheckInDate] = useState<string>(checkIn || "");
    const [checkOutDate, setCheckOutDate] = useState<string>(checkOut || "");

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!updateBooking) {
            console.log("inside create");
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
            console.log("inside update");
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
            <button className="bg-blue-500 text-white p-2 rounded-md" type="submit">{updateBooking ? "Update" : "Book"}</button>
        </form>
    )
}

export default BookingForm