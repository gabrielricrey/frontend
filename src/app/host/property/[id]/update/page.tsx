import PropertyForm from "@/components/property/PropertyForm"

type UpdatePropertyPageProps = {
    params: {
        id: string
    }
}

export default async function UpdatePropertyPage({ params }: UpdatePropertyPageProps) {
    const id = await params.id;
    console.log(id);
    return (
        <PropertyForm />
    )
}

