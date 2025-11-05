"use client";
import { useState, useEffect, useCallback } from "react";
import BookingForm from "./BookingForm";
import { XMarkIcon, PencilSquareIcon } from "@heroicons/react/16/solid";
import BookingService from "@/utils/bookingService";
import CancelBookingModal from "./CancelBookingModal";
import Image from "next/image";
import { toast } from "react-toastify";
import clsx from "clsx";


type BookingProp = {
    id: string
}

export default function Booking({ id }: BookingProp) {
    const [showEditForm, setShowEditForm] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [booking, setBooking] = useState<BookingWithProperty | null>(null)

    const bookingId = id;

    const fetchBooking = useCallback(async () => {
        setShowEditForm(false);
        const response = await new BookingService().getBooking(id);
        const data = await response.json();
        setBooking(data.booking)
    }, [id]);

    const handleClick = async () => {
        const status: string = 'cancelled';
        const response = await new BookingService().updateBooking({ bookingId, status });
        if (response.status === 400) {
            let data = await response.json();
            console.log(data);
        }
        if (!response.ok) {
            throw new Error("Error cancel booking");
        }
        fetchBooking();
        setShowDeleteModal(false);
        toast.success("Success canceling booking");
    }

    useEffect(() => {
        fetchBooking();
    }, [fetchBooking])

    return (
        <>
            {booking &&
                <div className="min-h-screen flex items-start justify-center bg-gray-50 px-4">
                    <div className="w-full max-w-4xl mt-16 md:mt-20 bg-white rounded-2xl shadow-sm border border-gray-200 relative p-4">
                        {booking.status === 'pending' &&

                            <div className="flex gap-1 absolute right-2 top-2 text-gray-700 bg-white rounded-2xl p-2">
                                <button onClick={() => setShowEditForm(prev => !prev)}>
                                    <PencilSquareIcon className="w-5 h-5 hover:text-blue-500 cursor-pointer" />
                                </button>
                                <button onClick={() => setShowDeleteModal(prev => !prev)}>
                                    <XMarkIcon className="w-5 h-5 hover:text-blue-500 cursor-pointer" />
                                </button>
                            </div>
                        }
                        <Image
                            className="w-full h-64 md:h-80 object-cover"
                            src={booking.properties.image_url}
                            width={400}
                            height={400}
                            alt={booking.properties.name} />
                        <div className="relative flex flex-col items-start">
                            <h3 className="text-2xl font-bold mt-3 mb-4">{booking.properties.name}</h3>
                            <div className="flex">

                                <p>{booking.check_in_date} → {booking.check_out_date}</p>

                            </div>
                            <p className="font-bold">{booking.total_cost}$</p>
                            <p className={clsx("absolute top-2 right-2 p-1 rounded-md", booking.status === 'pending' ? "bg-yellow-200 text-yellow-500" : booking.status === 'confirmed' ? "bg-green-200 text-green-500" : "bg-red-200 text-red-500")}>{booking.status}</p>
                        </div>

                        {showEditForm &&
                            <div className="w-full md:w-1/2 p-2 rounded-md absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white">
                                <BookingForm bookingId={id} checkInDate={booking.check_in_date} checkOutDate={booking.check_out_date} pricePerNight={booking.properties.price_per_night} onUpdate={fetchBooking} />
                            </div>
                        }
                        {showDeleteModal &&
                            <div className="w-full md:w-1/2 p-2 rounded-md absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white">
                                <CancelBookingModal handleClick={handleClick} closeModal={setShowDeleteModal} />
                            </div>
                        }
                    </div>
                </div>
            }
        </>
    )
}
