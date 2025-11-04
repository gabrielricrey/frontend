import { cookies } from "next/headers"
import HostProperty from "@/components/property/HostProperty";
import { notFound } from "next/navigation";

type PropertyPageProps = {
    params: {
        id: String,
    }
}

export default async function PropertyPage({ params }: PropertyPageProps) {

    const id = await params.id;

    return (
        <div className="w-full flex justify-center">
            <HostProperty id={id} />
        </div>
    )


}

