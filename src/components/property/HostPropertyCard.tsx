import Link from "next/link";
import Image from "next/image";

type HostPropertyCardProps = {
    data: PropertyPreview;
};

export default function HostPropertyCard({ data }: HostPropertyCardProps) {
    return (
        <Link href={`/host/property/${data.id}`}>
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition cursor-pointer flex flex-col">
                {/* Bild */}
                <div className="relative w-full h-48">
                    <Image
                        src={data.image_url}
                        alt={data.name}
                        fill
                        className="object-cover"
                    />
                </div>

                {/* Property info */}
                <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                        {data.name}
                    </h3>

                </div>
            </div>
        </Link>
    );
}
