import React from 'react'
import Link from 'next/link';
import { CheckIcon, XMarkIcon } from '@heroicons/react/16/solid';

interface BookingCardProps {
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
    }
}

const HostBookingCard = ({ booking }: BookingCardProps) => {
    return (
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
            {booking.property_image && (
                <img
                    src={booking.property_image}
                    alt={booking.property_name}
                    className="w-full h-48 object-cover"
                />
            )}
            <div className="p-4 flex">
                <div>

                    <h2 className="text-xl font-semibold text-gray-800">{booking.property_name}</h2>
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
                </div>
                {booking.status === 'pending' &&
                    <div className='flex'>
                        <button className=' border border-green-500 rounded-md'><CheckIcon className='size-6 text-green-500 ' /></button>
                        <button className='border border-red-500 rounded-md'><XMarkIcon className='size-6 text-red-500 ' /></button>
                    </div>
                }
            </div>
        </div>
    );
};

export default HostBookingCard