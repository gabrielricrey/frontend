"use client";
import { useEffect, useState } from "react";
import BookingService from "@/utils/bookingService";
import { useUser } from "@/context/UserContext";
import { differenceInDays, addDays } from "date-fns";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type BookingFormProps = {
    propertyId?: string;
    bookingId?: string;
    checkInDate?: string;
    checkOutDate?: string;
    propertyUserId?: string;
    pricePerNight: number;
    onUpdate?: () => void;
}

const BookingForm = ({ propertyId, propertyUserId, pricePerNight, bookingId, checkInDate: checkIn, checkOutDate: checkOut, onUpdate }: BookingFormProps) => {

    const [checkInDate, setCheckInDate] = useState<string>(checkIn || new Date().toISOString().split("T")[0]);
    const [checkOutDate, setCheckOutDate] = useState<string>(checkOut || addDays(new Date(checkInDate), 1).toISOString().split("T")[0]);
    const [totalCost, setTotalCost] = useState<number>(0);

    useEffect(() => {
        const days = differenceInDays(new Date(checkOutDate), new Date(checkInDate));
        setTotalCost(() => days * pricePerNight)
    }, [checkOutDate, checkInDate])

    const user = useUser();
    const router = useRouter();

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!bookingId) {

            const response = await new BookingService().createBooking(propertyId!, checkInDate, checkOutDate);
            if (response.status === 400) {
                let data = await response.json();
                if (data.message === "Property already booked for these dates") {
                    toast.warning("Property not available these dates")
                    return
                }
            }
            if (!response.ok) {
                toast.error("Error create booking!");
                throw new Error("Error create booking");

            }
            toast.success("Booking created!")
            const data = await response.json();
            router.push(`/booking/${data.bookingId}`);
            console.log(data);


        } else {

            const response = await new BookingService().updateBooking({ bookingId, checkInDate, checkOutDate });
            if (!response.ok) {
                console.log(response);
                toast.error("Error updating booking!");
                throw new Error("Error update booking");

            }
            toast.success("Booking updated!")
            const data = await response.json();
            console.log("Updated data: ", data);
            onUpdate!();

        }


    }
    return (
        <div>
            {user?.user ? (
                user?.user.id !== propertyUserId ?
                    <form onSubmit={onSubmit} className="flex flex-col items-center">
                        <label className="text-sm">
                            Check-in
                        </label>
                        <input
                            type="date"
                            value={checkInDate}
                            min={new Date().toISOString().split("T")[0]}
                            onChange={(e) => setCheckInDate(e.target.value)}
                            className="border p-2 rounded w-full bg-white"
                        />
                        <label className="text-sm">
                            Check-out
                        </label>
                        <input
                            type="date"
                            value={checkOutDate}
                            min={checkInDate ? addDays(new Date(checkInDate), 1).toISOString().split("T")[0] : new Date().toISOString().split("T")[0]}
                            onChange={(e) =>
                                setCheckOutDate(e.target.value)
                            }
                            className="border p-2 rounded w-full bg-white"
                        />

                        <p className="w-full my-2"> {totalCost > 0 && <span className="font-medium text-xl">$ {totalCost}</span>}</p>

                        <button className="bg-blue-500 text-white p-2 rounded-xl w-full" type="submit">{bookingId ? "Update" : "Book"}</button>
                    </form> : <p>your own property</p>) :

                !user?.user &&
                <p>Sign in to be able to book!</p>

            }

        </div >
    )
}

export default BookingForm