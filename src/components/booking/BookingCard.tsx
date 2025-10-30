import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

type BookingCardProp = {
    booking: BookingWithProperty
}

const BookingCard = ({ booking }: BookingCardProp) => {
    const { id, check_in_date, check_out_date, total_cost, status, properties } = booking;

    return (
        <Link href={`/booking/${id}`}>
            <li className="bg-white rounded-xl shadow-md p-4 border border-black hover:shadow-lg transition-shadow duration-300">

                <div className="text-sm text-gray-600 space-y-1 mb-3">
                    <Image
                        src={properties.image_url}
                        width={400}
                        height={400}
                        alt={properties.name} />
                    <h3>{properties.name}</h3>
                    <p><span className="font-medium text-gray-700">Check-in:</span> {check_in_date}</p>
                    <p><span className="font-medium text-gray-700">Check-out:</span> {check_out_date}</p>
                    <p><span className="font-medium text-gray-700">Total:</span> ${total_cost}</p>
                    <p><span className="font-medium text-gray-700">Status:</span>{status}</p>

                </div>
            </li>
        </Link>
    )
}

export default BookingCard