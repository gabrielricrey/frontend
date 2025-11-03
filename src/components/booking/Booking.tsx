"use client";
import { useState, useEffect } from "react";
import BookingForm from "./BookingForm";
import { XMarkIcon, PencilSquareIcon } from "@heroicons/react/16/solid";
import BookingService from "@/utils/bookingService";
import CancelBookingModal from "./CancelBookingModal";
import Image from "next/image";


type BookingProp = {
    id: string
}

export default function Booking({ id }: BookingProp) {
    const [showEditForm, setShowEditForm] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [booking, setBooking] = useState<BookingWithProperty | null>(null)

    const bookingId = id;

    useEffect(() => {
        const fetchBooking = async () => {
            const response = await new BookingService().getBooking(id);
            const data = await response.json();
            console.log(data);
            setBooking(data.booking);
        }

        fetchBooking();
    }, [])



    const handleClick = async () => {
        try {
            const status: string = 'cancelled';
            const response = await new BookingService().updateBooking({ bookingId, status });
            if (!response.ok) {
                throw new Error("Error cancel booking");
            }
        } catch (err) {
            console.error("Error", err);
        }
    }

    return (
        <>
            {booking &&
                <div className="border rounded-md p-2 relative">
                    <div className="flex gap-1 absolute right-2 top-2">
                        <button onClick={() => setShowEditForm(prev => !prev)}>
                            <PencilSquareIcon className="size-6" />
                        </button>
                        <button onClick={() => setShowDeleteModal(prev => !prev)}>
                            <XMarkIcon className="size-6" />
                        </button>
                    </div>
                    <Image
                        src={booking.properties.image_url}
                        width={400}
                        height={400}
                        alt={booking.properties.name} />
                    <h3>{booking.properties.name}</h3>
                    <p>{booking.check_in_date}</p>
                    <p>{booking.check_out_date}</p>
                    <p> Status: {booking.status}</p>

                    {showEditForm &&
                        <div>
                            <BookingForm bookingId={id} checkInDate={booking.check_in_date} checkOutDate={booking.check_out_date} />
                        </div>
                    }
                    {showDeleteModal &&
                        <CancelBookingModal handleClick={handleClick} />
                    }
                </div>
            }
        </>
    )
}
