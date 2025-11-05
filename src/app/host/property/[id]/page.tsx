
import HostProperty from "@/components/property/HostProperty";


type PropertyPageProps = {
    params: {
        id: String,
    }
}

export default async function PropertyPage({ params }: PropertyPageProps) {

    const { id } = await params;

    return (

        <HostProperty id={id} />
    )


}

