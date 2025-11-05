"use client";

import HostPropertyCard from "./HostPropertyCard";
import { useState, useEffect, useMemo } from "react";
import HostPropertyService from "@/utils/hostPropertyService";

export default function HostProperties() {
    const [properties, setProperties] = useState<PropertyPreview[] | []>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const hostPropertyService = useMemo(() => new HostPropertyService(), []);

    useEffect(() => {
        let isMounted = true;
        (async () => {
            try {

                const response = await hostPropertyService.getProperties();
                const data = await response.json();
                setProperties(data.properties);
            } catch (err) {
                if (isMounted) setError("Error fetching your properties");
            } finally {
                if (isMounted) setLoading(false);
            }
        })();

        return () => {
            isMounted = false;
        }

    }, [hostPropertyService]);

    return (
        <div className="w-full max-w-6xl mx-auto px-4 md:px-8 mt-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
                Your Properties
            </h2>

            {loading &&
                <div className="flex justify-center items-center h-64">
                    <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                </div>
            }

            {error && <p className="text-red-500">{error}</p>}

            {!error && !loading && properties && (
                <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {properties.map((property) => (
                        <HostPropertyCard data={property} key={property.id} />
                    ))}
                </ul>
            )}
        </div>
    );
}
