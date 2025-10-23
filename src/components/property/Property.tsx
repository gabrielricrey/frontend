"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import BookingService from "@/utils/bookingService";

type PropertyProp = {
    property: Property
}

const Property = ({ property }: PropertyProp) => {
    const { id, image_url, name, description, price_per_night } = property;

    const [checkInDate, setCheckInDate] = useState<string>("");
    const [checkOutDate, setCheckOutDate] = useState<string>("");

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await new BookingService().createBooking(checkInDate, checkOutDate, id);
            if (!response.ok) {
                throw new Error("Error create booking");

            }
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.log(error);
        }


    }

    return (
        <div className="w-full flex justify-center">
            <div className="w-full lg:w-3/4">
                <Image className="w-full h-48 object-cover" src={image_url} alt={name} width={400} height={192} />
                <div className="p-4 w-full flex">
                    <div className="flex-1">
                        <h2 className="text-xl font-semibold mb-2">{name}</h2>
                        <p className="text-gray-600 text-sm mb-4">{description}</p>
                        <div className="text-lg font-bold text-gray-800">
                            ${price_per_night} / night
                        </div>
                    </div>
                    <div className="flex-1">
                        Booking
                        <form onSubmit={onSubmit}>

                            <label>
                                Check-in
                                <input
                                    type="date"
                                    value={checkInDate}
                                    min={new Date().toISOString().split("T")[0]}
                                    onChange={(e) => setCheckInDate(e.target.value)}
                                    className="border p-2 rounded w-full"
                                />
                            </label>

                            <label>
                                Check-out
                                <input
                                    type="date"
                                    value={checkOutDate}
                                    min={checkInDate}
                                    onChange={(e) =>
                                        setCheckOutDate(e.target.value)
                                    }
                                    className="border p-2 rounded w-full"
                                />
                            </label>
                            <button className="bg-blue-500 text-white p-2 rounded-md" type="submit">Book</button>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Property