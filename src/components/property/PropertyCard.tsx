import Image from "next/image";
import Link from "next/link";

type PropertyCardProps = {
    property: Property;
};

const PropertyCard = ({ property }: PropertyCardProps) => {
    const { id, image_url, name, description, price_per_night } = property;

    return (
        <Link href={`/property/${id}`} className="group">
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="relative w-full h-56">
                    <Image
                        src={image_url}
                        alt={name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                </div>

                <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                        {name}
                    </h3>

                    <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                        {description}
                    </p>

                    <div className="mt-3 text-gray-900 font-medium">
                        <span className="font-semibold">${price_per_night}</span>{" "}
                        <span className="text-gray-500">/ night</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default PropertyCard;
