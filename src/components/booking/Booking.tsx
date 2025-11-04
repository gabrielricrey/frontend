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
                <div className="w-full h-screen md:w-3/4 shadow-sm rounded-2xl overflow-hidden relative mt-16 md:mt-20">
                    <div className="flex gap-1 absolute right-2 top-2 text-gray-700 bg-white rounded-2xl p-2">
                        <button onClick={() => setShowEditForm(prev => !prev)}>
                            <PencilSquareIcon className="w-5 h-5 hover:text-blue-500 cursor-pointer" />
                        </button>
                        <button onClick={() => setShowDeleteModal(prev => !prev)}>
                            <XMarkIcon className="w-5 h-5 hover:text-blue-500 cursor-pointer" />
                        </button>
                    </div>
                    <Image
                        className="w-full h-64 md:h-80 object-cover"
                        src={booking.properties.image_url}
                        width={400}
                        height={400}
                        alt={booking.properties.name} />
                    <div className="relative text-center">
                        <h3 className="text-2xl font-bold mt-3 mb-4">{booking.properties.name}</h3>
                        <p>Check In: {booking.check_in_date}</p>
                        <p>Check Out: {booking.check_out_date}</p>
                        <p className={`absolute top-2 right-2 p-1 rounded-md ${booking.status === 'pending' ? "bg-amber-300" : booking.status === 'confirmed' ? "bg-green-400" : "bg-red-500"}`}>{booking.status}</p>
                    </div>

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
