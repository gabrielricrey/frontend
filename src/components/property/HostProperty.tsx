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

                <div className="w-full md:w-4/5 flex flex-col relative rounded-md">
                    <div className="w-full flex justify-between items-center">
                        <h3 className="text-2xl font-bold my-3 p-2">
                            {property?.name}
                        </h3>
                        <div className="flex gap-4">
                            <button className="flex gap-1" onClick={handleEditClick}>
                                <PencilIcon className="size-6" />
                                <span className="hidden md:block">
                                    Edit
                                </span>
                            </button>
                            <button className="flex gap-1" onClick={handleDeleteClick}>
                                <TrashIcon className="size-6" />
                                <span className="hidden md:block">
                                    Delete
                                </span>
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row items-center">
                        <Image
                            src={property.image_url}
                            alt={property.name}
                            width={400}
                            height={400}
                            className="w-full md:w-1/2 rounded-md flex-1"
                        />
                        <div className="text-center flex-1">
                            <p>
                                Price per night: {property.price_per_night}
                            </p>
                            <p>
                                Status: {property.is_available ?
                                    <span className="bg-green-200 rounded-md text-green-600 p-1"> Available</span> :
                                    <span className="bg-red-200 rounded-md text-red-600 p-1"> Not Available</span>}
                            </p>
                            <p>
                                {property.description}
                            </p>
                        </div>
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