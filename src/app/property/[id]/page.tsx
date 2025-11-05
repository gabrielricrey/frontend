import React from 'react'
import PropertyService from '@/utils/propertyService'
import Property from '@/components/property/Property'
import { notFound } from 'next/navigation'

type PropertPageProps = {
    params: { id: string }
}

const PropertyPage = async ({ params }: PropertPageProps) => {
    const { id } = await params;
    const response = await new PropertyService().getProperty(id);

    if (response.status === 404) {
        notFound();
    }

    let data;

    try {
        data = await response.json();

    } catch {
        data = null;
    }

    if (!response.ok) {
        const message = data?.message
        throw new Error(message || "Error fetching property");
    }


    return (
        <Property property={data} />
    )


}

export default PropertyPage