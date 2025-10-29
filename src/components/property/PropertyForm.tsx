"use client";

import { useState, useEffect } from "react";
import HostPropertyService from "@/utils/hostPropertyService";
import { useRouter } from "next/navigation";

type PropertyFormProps = {
    property?: Property
}


const PropertyForm = ({ property }: PropertyFormProps) => {


    const [propertyName, setPropertyName] = useState(property?.name || "");
    const [description, setDescription] = useState(property?.description || "");
    const [costPerNight, setCostPerNight] = useState<number | "">(property?.price_per_night || "");
    const [isAvailable, setIsAvailable] = useState(property?.is_available || false);
    const [imageUrl, setImageUrl] = useState(property?.image_url || "");

    const [isUpdate, setIsUpdate] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (property) {
            setIsUpdate(true);
        }
    }, [])


    const onSubmit = async (e: React.FormEvent) => {
        try {
            e.preventDefault();

            if (!propertyName || !description || !costPerNight || isAvailable === null || !imageUrl) {
                console.log("Fill every field");
                return;
            }

            const propertyData = {
                name: propertyName,
                description,
                price_per_night: Number(costPerNight),
                is_available: isAvailable,
                image_url: imageUrl,
            };

            console.log(propertyData);

            let response;

            if (!isUpdate) {
                response = await new HostPropertyService().createProperty(propertyData);

            } else {
                response = await new HostPropertyService().updateProperty(property!.id, propertyData);
            }


            if (!response.ok) {
                if (!isUpdate) {
                    throw new Error("Error creating property");
                } else {
                    throw new Error("Error updating property");
                }
            }

            const data = await response.json();

            console.log("Success!", data);

            setPropertyName("");
            setDescription("");
            setCostPerNight("");
            setIsAvailable(false);
            setImageUrl("");

            router.push(`/host/property/${data.property.id}`);

        } catch (error) {
            console.error("Error:", error)
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-xl shadow-md">
            <form onSubmit={onSubmit} className="flex flex-col gap-4">
                <label className="flex flex-col">
                    <span className="font-medium mb-1">Name</span>
                    <input
                        id="name"
                        type="text"
                        value={propertyName}
                        onChange={(e) => setPropertyName(e.target.value)}
                        className="border rounded-md p-2"
                        required
                    />
                </label>

                <label className="flex flex-col">
                    <span className="font-medium mb-1">Description</span>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="border rounded-md p-2"
                        rows={3}
                    />
                </label>

                <label className="flex flex-col">
                    <span className="font-medium mb-1">Cost per night</span>
                    <input
                        id="cost"
                        type="number"
                        value={costPerNight}
                        onChange={(e) =>
                            setCostPerNight(e.target.value ? Number(e.target.value) : "")
                        }
                        className="border rounded-md p-2"
                        required
                    />
                </label>

                <fieldset className="flex flex-col">
                    <legend className="font-medium mb-1">Availability</legend>
                    <div className="flex gap-4">
                        <label className="flex items-center gap-1">
                            <input
                                type="radio"
                                name="availability"
                                checked={isAvailable}
                                onChange={() => setIsAvailable(true)}
                            />
                            Available
                        </label>
                        <label className="flex items-center gap-1">
                            <input
                                type="radio"
                                name="availability"
                                checked={!isAvailable}
                                onChange={() => setIsAvailable(false)}
                            />
                            Unavailable
                        </label>
                    </div>
                </fieldset>

                <label className="flex flex-col">
                    <span className="font-medium mb-1">Image URL</span>
                    <input
                        id="imageUrl"
                        type="url"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        className="border rounded-md p-2"
                    />
                </label>

                <button
                    type="submit"
                    className="mt-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md p-2"
                >
                    <span>
                        {isUpdate ? "Save Changes" : "Create Property"}
                    </span>
                </button>
            </form>
        </div>
    );
};

export default PropertyForm