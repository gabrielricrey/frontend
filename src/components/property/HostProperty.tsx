"use client";

import { useState } from "react";
import Image from "next/image";
import { TrashIcon, PencilIcon } from "@heroicons/react/16/solid";
type HostPropertyProps = {
    data: Property
}

// interface NewProperty {
//     name: string,
//     description?: string,
//     price_per_night: number,
//     user_id?: string,
//     is_available?: boolean,
//     image_url: string,
// }

// interface Property extends NewProperty {
//     id: string,
//     created_at: string,
//     updated_at: string,

export default function HostProperty({ data }: HostPropertyProps) {

    return (
        <div className="w-full md:w-4/5 flex flex-col relative rounded-md">
            <div className="w-full flex justify-between items-center">
                <h3 className="text-2xl font-bold my-3 p-2">{data.name}</h3>
                <div className="flex gap-4">
                    <button className="flex gap-1"><PencilIcon className="size-6" /><span className="hidden md:block">Edit</span></button>
                    <button className="flex gap-1"><TrashIcon className="size-6" /><span className="hidden md:block">Delete</span></button>
                </div>
            </div>
            <div className="flex flex-col md:flex-row items-center">
                <Image
                    src={data.image_url}
                    alt={data.name}
                    width={400}
                    height={400}
                    className="w-full md:w-1/2 rounded-md flex-1"
                />
                <div className="text-center flex-1">
                    <p>Price per night: {data.price_per_night}</p>
                    <p>Status: {data.is_available ? <span className="bg-green-200 rounded-md text-green-600 p-1"> Available</span> : <span className="bg-red-200 rounded-md text-red-600 p-1"> Not Available</span>}</p>
                    <p>{data.description}</p>
                </div>
            </div>

        </div>
    )
}