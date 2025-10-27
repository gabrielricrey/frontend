"use client";
import { useState } from "react";
import BookingForm from "./BookingForm";
import { XMarkIcon, PencilSquareIcon } from "@heroicons/react/16/solid";
import BookingService from "@/utils/bookingService";


type BookingProp = {
    booking: BookingWithProperty
}

const Booking = ({ booking }: BookingProp) => {
    const [showEditForm, setShowEditForm] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    console.log(booking);

    const handleClick = async () => {
        try {
            const bookingId = booking.id;
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
        <div className="border rounded-md p-2 relative">
            <div className="flex gap-1 absolute right-2 top-2">
                <button onClick={() => setShowEditForm(prev => !prev)}>
                    <PencilSquareIcon className="size-6" />
                </button>
                <button onClick={() => setShowDeleteModal(prev => !prev)}>
                    <XMarkIcon className="size-6" />
                </button>
            </div>
            <h3>{booking.properties.name}</h3>
            <p>{booking.check_in_date}</p>
            <p>{booking.check_out_date}</p>

            {showEditForm &&
                <div>
                    <BookingForm bookingId={booking.id} checkInDate={booking.check_in_date} checkOutDate={booking.check_out_date} updateBooking={true} />
                </div>
            }
            {showDeleteModal &&
                <div className="">
                    <p>Are you sure you want to delete?</p>
                    <div>
                        <button onClick={handleClick}>
                            Delete
                        </button>
                        <button>
                            Cancel
                        </button>
                    </div>
                </div>
            }
        </div>
    )
}

export default Booking