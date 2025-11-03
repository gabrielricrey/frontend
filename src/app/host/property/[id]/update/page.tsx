import PropertyForm from "@/components/property/PropertyForm"
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

type UpdatePropertyPageProps = {
    params: {
        id: string
    }
}

export default async function UpdatePropertyPage({ params }: UpdatePropertyPageProps) {

    const id = await params.id;

    return (

        <PropertyForm id={id} />

    )
}

