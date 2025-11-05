"use client";

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import Image from "next/image";
import { TrashIcon, PencilIcon } from "@heroicons/react/16/solid";
import DeletePropertyModal from "./DeletePropertyModal";
import HostPropertyService from "@/utils/hostPropertyService";
type HostPropertyProps = {
    id: String
}



export default function HostProperty({ id }: HostPropertyProps) {

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [property, setProperty] = useState<Property | null>(null);

    useEffect(() => {
        const fetchProperty = async () => {
            const response = await new HostPropertyService().getProperty(id);
            const data = await response.json();
            setProperty(data.property);
        }

        fetchProperty();
    }, [])



    const handleEditClick = () => {
        redirect(`/host/property/${property ? property.id : ""}/update`);
    }

    const handleDeleteClick = async () => {
        setShowDeleteModal(prev => !prev);
    }

    return (
        <>
            {property &&

                <div className="w-full mt-16 md:mt-20 md:w-1/2 flex flex-col rounded-md p-2">
                    <div className="relative">
                        <Image
                            src={property.image_url}
                            alt={property.name}
                            width={400}
                            height={400}
                            className="w-full rounded-md flex-1 h-64 md:h-80 object-cover"
                        />
                        <div className="flex gap-4 bg-white absolute top-2 right-2 p-2 rounded-md">
                            <button className="flex gap-1" onClick={handleEditClick}>
                                <PencilIcon className="size-5 text-gray-700" />
                                <span className="hidden md:block">
                                    Edit
                                </span>
                            </button>
                            <button className="flex gap-1" onClick={handleDeleteClick}>
                                <TrashIcon className="size-5 text-gray-700" />
                                <span className="hidden md:block">
                                    Delete
                                </span>
                            </button>
                        </div>
                    </div>
                    <div className="text-center flex-1 relative">
                        <h3 className="text-xl font-bold my-3 p-2">
                            {property?.name}
                        </h3>
                        <p>
                            {property.description}
                        </p>
                        <p>
                            Price per night: {property.price_per_night}
                        </p>
                        <p className="absolute top-4 right-2">
                            {property.is_available ?
                                <span className="bg-green-200 rounded-md text-green-600 p-2"> Available</span> :
                                <span className="bg-red-200 rounded-md text-red-600 p-2"> Not Available</span>}
                        </p>

                    </div>
                    {
                        showDeleteModal &&
                        <DeletePropertyModal setShowDeleteModal={setShowDeleteModal} id={property.id} />
                    }
                </div>
            }
        </>
    )
}