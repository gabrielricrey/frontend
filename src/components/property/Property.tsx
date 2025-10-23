"use client";

import Link from "next/link";
import Image from "next/image";

type PropertyProp = {
    property: Property
}

const Property = ({ property }: PropertyProp) => {
    console.log(property);
    const { image_url, name, description, price_per_night } = property;
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
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Property