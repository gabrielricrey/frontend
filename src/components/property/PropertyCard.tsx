import Image from "next/image";

type ProperyCardProps = {
    property: Property
}

const PropertyCard = ({ property }: ProperyCardProps) => {
    const { image_url, name, description, price_per_night } = property;
    return (
        <div className="max-w-sm bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <Image className="w-full h-48 object-cover" src={image_url} alt={name} width={400} height={192} />
            <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{name}</h2>
                <p className="text-gray-600 text-sm mb-4">{description}</p>
                <div className="text-lg font-bold text-gray-800">
                    ${price_per_night} / night
                </div>
            </div>
        </div>
    )
}

export default PropertyCard