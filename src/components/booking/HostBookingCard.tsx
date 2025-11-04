"use client";
import Link from 'next/link';
import { CheckIcon, XMarkIcon } from '@heroicons/react/16/solid';
import HostBookingService from '@/utils/hostBookingService';


interface HostBookingCardProps {
    booking: {
        id: string;
        property_id: string;
        property_name: string;
        property_image: string | null;
        user_id: string;
        user_profiles: {
            first_name: string;
        };
        check_in_date: string;
        check_out_date: string;
        total_cost: number;
        status: string;
        created_at: string;
        updated_at: string;
    },
    updateBookings: (index: number, status: string) => void,
    index: number,

}

const HostBookingCard = ({ booking, updateBookings, index }: HostBookingCardProps) => {

    const handleClick = async (action: "accept" | "reject") => {
        const status = action === 'accept' ? 'confirmed' : 'cancelled';
        console.log(status);
        try {
            const response = await new HostBookingService().updateBooking(booking.id, status);
            if (!response.ok) {
                throw new Error("Error updating booking");
            }

            updateBookings(index, status);


        } catch (error) {
            console.error("Error:", error);
        }

    }
    return (
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
            {booking.property_image && (
                <img
                    src={booking.property_image}
                    alt={booking.property_name}
                    className="w-full h-48 object-cover"
                />
            )}
            <div className="p-4 flex relative">
                <div className=''>

                    <h4 className="text-xl font-semibold text-gray-800">{booking.property_name}</h4>
                    <p className="text-gray-600 mt-1">
                        Booked by <span className="font-medium">{booking.user_profiles.first_name}</span>
                    </p>
                    <p className="text-gray-600 mt-1">
                        {booking.check_in_date} → {booking.check_out_date}
                    </p>
                    <p className="text-gray-800 font-semibold mt-2">Total: ${booking.total_cost}</p>
                    <span
                        className={`inline-block mt-3 px-3 py-1 rounded-full text-sm font-medium ${booking.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : booking.status === "confirmed"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                    >
                        {booking.status.toUpperCase()}
                    </span>
                    {booking.status === 'pending' &&
                        <div className='flex absolute bottom-10 right-10 gap-2'>
                            <button onClick={() => handleClick('accept')} className=' bg-green-500 rounded-md'><CheckIcon className='size-10 text-white cursor-pointer' /></button>
                            <button onClick={() => handleClick('reject')} className=' bg-red-500 rounded-md'><XMarkIcon className='size-10 text-white cursor-pointer' /></button>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default HostBookingCard