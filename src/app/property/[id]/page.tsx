import React from 'react'
import PropertyService from '@/utils/propertyService'
import Property from '@/components/property/Property'

type PropertPageProps = {
    params: { id: string }
}

const PropertyPage = async ({ params }: PropertPageProps) => {
    const id = params.id;
    const response = await new PropertyService().getProperty(id);
    console.log(response);
    return (
        <Property property={response.data.property} />
    )
}

export default PropertyPage