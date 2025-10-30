import React from 'react'
import PropertyService from '@/utils/propertyService'
import Property from '@/components/property/Property'

type PropertPageProps = {
    params: { id: string }
}

const PropertyPage = async ({ params }: PropertPageProps) => {
    try {

        const id = params.id;
        const response = await new PropertyService().getProperty(id);

        if (!response.ok) {
            throw new Error("Error fetching property");
        }
        const data = await response.json();
        return (
            <Property property={data} />
        )
    } catch (error) {
        console.error("Error:", error);
        return (
            <p>Error</p>
        )
    }

}

export default PropertyPage