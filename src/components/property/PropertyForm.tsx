"use client";

import { useState, useEffect } from "react";
import HostPropertyService from "@/utils/hostPropertyService";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

type PropertyFormProps = {
    id?: String
}


const PropertyForm = ({ id }: PropertyFormProps) => {

    const [propertyName, setPropertyName] = useState("");
    const [description, setDescription] = useState("");
    const [costPerNight, setCostPerNight] = useState<number | "">("");
    const [isAvailable, setIsAvailable] = useState(false);
    const [imageUrl, setImageUrl] = useState("");

    const [isUpdate, setIsUpdate] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const fetchProperty = async () => {
            const response = await new HostPropertyService().getProperty(id!)
            const data = await response.json();
            const property: Property = data.property;
            console.log(data);
            setPropertyName(property.name);
            setDescription(property.description);
            setCostPerNight(property.price_per_night);
            setIsAvailable(property.is_available);
            setImageUrl(property.image_url);

        }

        if (id) {
            setIsUpdate(true);
            fetchProperty();

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
                response = await new HostPropertyService().updateProperty(id!, propertyData);
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

            if (!isUpdate) {
                toast.success("Sucess creating property!");
            } else {
                toast.success("Sucess updating property!");
            };

            router.push(`/host/property/${data.property.id}`);

        } catch (error) {
            console.error("Error:", error)
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
                <h2 className="text-2xl font-semibold text-center text-gray-900 mb-6">
                   {isUpdate ? "Update Property" : "Create Property"}
                </h2>
                <form onSubmit={onSubmit} className="flex flex-col gap-4">


                    <input
                        id="name"
                        type="text"
                        value={propertyName}
                        onChange={(e) => setPropertyName(e.target.value)}
                        placeholder="Name"
                        className={`p-3 rounded-lg border border-gray-300
                                focus:outline-none focus:ring-2 focus:ring-blue-400`}
                        required
                    />




                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Description"
                        className={`p-3 rounded-lg border border-gray-300
                                focus:outline-none focus:ring-2 focus:ring-blue-400`}
                        rows={3}
                    />



                    <input
                        id="cost"
                        type="number"
                        value={costPerNight}
                        onChange={(e) =>
                            setCostPerNight(e.target.value ? Number(e.target.value) : "")
                        }
                        placeholder="Cost Per Night"
                        className={`p-3 rounded-lg border border-gray-300
                                focus:outline-none focus:ring-2 focus:ring-blue-400`}
                        required
                    />


                    <fieldset className="">
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


                    <input
                        id="imageUrl"
                        type="url"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        placeholder="Image URL"
                        className={`p-3 rounded-lg border border-gray-300
                                focus:outline-none focus:ring-2 focus:ring-blue-400`}
                    />
                    <button
                        type="submit"
                        className="w-full py-3 rounded-lg bg-black text-white font-medium hover:cursor-pointer transition"
                    >
                        <span>
                            {isUpdate ? "Save Changes" : "Create Property"}
                        </span>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PropertyForm