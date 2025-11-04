import React from "react";
import Link from "next/link";
import Image from "next/image";

type BookingCardProp = {
    booking: BookingWithProperty;
};

const BookingCard = ({ booking }: BookingCardProp) => {
    const { id, check_in_date, check_out_date, total_cost, status, properties } = booking;

    // Status färger
    const statusColor = {
        pending: "text-yellow-500",
        confirmed: "text-green-500",
        cancelled: "text-red-500",
    }[status.toLowerCase()] || "text-gray-500";

    return (
        <Link href={`/booking/${id}`}>
            <li className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition cursor-pointer flex flex-col md:flex-row border border-gray-200">
                {/* Bild */}
                <div className="relative w-full md:w-48 h-48 md:h-auto flex-shrink-0">
                    <Image
                        src={properties.image_url}
                        alt={properties.name}
                        fill
                        className="object-cover"
                    />
                </div>

                {/* Info */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{properties.name}</h3>
                        <p className="text-gray-600 text-sm"><span className="font-medium">Check-in:</span> {check_in_date}</p>
                        <p className="text-gray-600 text-sm"><span className="font-medium">Check-out:</span> {check_out_date}</p>
                        <p className="text-gray-600 text-sm"><span className="font-medium">Total:</span> ${total_cost}</p>
                    </div>
                    <p className={`mt-3 font-semibold ${statusColor}`}>Status: {status}</p>
                </div>
            </li>
        </Link>
    );
};

export default BookingCard;
