"use client";

import HostPropertyCard from "./HostPropertyCard";
import { useState, useEffect } from "react";
import HostPropertyService from "@/utils/hostPropertyService";

export default function HostProperties() {
    const [properties, setProperties] = useState<PropertyPreview[] | []>([]);

    useEffect(() => {
        const fetchProperties = async () => {
            const response = await new HostPropertyService().getProperties();
            const data = await response.json();
            setProperties(data.properties);
        };

        fetchProperties();
    }, []);

    return (
        <div className="w-full max-w-6xl mx-auto px-4 md:px-8 mt-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
                Your Properties
            </h2>

            {properties && properties.length > 0 ? (
                <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {properties.map((property) => (
                        <HostPropertyCard data={property} key={property.id} />
                    ))}
                </ul>
            ) : (
                <p className="text-center text-gray-500 mt-10">
                    You have no properties yet
                </p>
            )}
        </div>
    );
}
