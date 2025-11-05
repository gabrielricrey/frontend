"use client";
import PropertyCard from "./PropertyCard";
import PropertyService from "@/utils/propertyService";
import { useEffect, useState, useMemo } from "react";
import { useUser } from "@/context/UserContext";

export default function Properties() {

    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const userId = useUser()?.user?.id;

    const propertyService = useMemo(() => new PropertyService(), []);

    useEffect(() => {
        let isMounted = true;

        (async () => {
            try {
                const response = await new PropertyService().getProperties();
                const data = await response.json();

                if (!response.ok) {
                    throw new Error("Error fetching properties");
                }

                if (isMounted) {
                    setProperties(data.properties.data);
                }
            } catch (err) {
                if (isMounted) setError("Oops, error getting properties.");
            } finally {
                if (isMounted) setLoading(false);
            }
        })();

        return () => {
            isMounted = false;
        }

    }, [propertyService])


    return (
        <section className="max-w-7xl mx-auto px-4 py-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-left">
                Explore popular stays
            </h2>

            {loading &&
                <div className="flex justify-center items-center h-64">
                    <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                </div>
            }

            {error && <p className="text-red-500">{error}</p>}

            {!loading && !error &&
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {properties.filter((p) => p.user_id !== userId).map((p) => (
                        <PropertyCard property={p} key={p.id} />
                    ))}
                </ul>
            }
        </section>
    );
}
