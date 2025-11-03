"use client";

import HostPropertyCard from "./HostPropertyCard";
import { useState, useEffect } from "react";

import HostPropertyService from "@/utils/hostPropertyService";


export default function HostProperties() {

    const [properties, setProperties] = useState<PropertyPreview[] | []>([])

    useEffect(() => {
        const fetchProperties = async () => {
            const response = await new HostPropertyService().getProperties();
            const data = await response.json();
            setProperties(data.properties);
        }

        fetchProperties();
    }, [])


    return (

        <ul>
            {properties && properties.map(property => <HostPropertyCard data={property} key={property.id} />)}
            {!properties &&
                <p>You have no properties yet</p>
            }
        </ul>

    )

}