import Link from "next/link"
import Image from "next/image"

type HostPropertyCardProps = {
    data: PropertyPreview
}

export default async function HostPropertyCard({ data }: HostPropertyCardProps) {
    return (
        <Link
            href={`/host/property/${data.id}`}
        >
            <div className="flex items-center border rounded-md">
                <Image
                    src={data.image_url}
                    alt={data.name}
                    width={400}
                    height={400}
                    className="flex-1"
                />
                <h6 className="flex-2">{data.name}</h6>
            </div>
        </Link>
    )
}