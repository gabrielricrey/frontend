import React from 'react'

type BookingCardProp = {
    booking: Booking
}

const BookingCard = ({ booking }: BookingCardProp) => {
    const { check_in_date, check_out_date, total_cost, status } = booking;
    return (
        <li className="bg-white rounded-xl shadow-md p-4 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-gray-800 capitalize">
                    {status}
                </h3>
                <span className="text-sm text-gray-500">
                    {new Date(booking.created_at).toLocaleDateString()}
                </span>
            </div>

            <div className="text-sm text-gray-600 space-y-1 mb-3">
                <p><span className="font-medium text-gray-700">Check-in:</span> {check_in_date}</p>
                <p><span className="font-medium text-gray-700">Check-out:</span> {check_out_date}</p>
                <p><span className="font-medium text-gray-700">Total:</span> ${total_cost}</p>
            </div>

            <button className="w-full bg-blue-600 text-white text-sm font-medium py-2 rounded-lg hover:bg-blue-700 transition-colors">
                View details
            </button>
        </li>
    )
}

export default BookingCard