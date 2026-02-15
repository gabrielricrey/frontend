import Image from "next/image";
import BookingForm from "../booking/BookingForm";

type PropertyProp = {
    property: Property;
};

const Property = ({ property }: PropertyProp) => {
    const { id, image_url, name, description, price_per_night, user_id } = property;

    return (
        <div className="w-full flex justify-center mt-16 md:mt-20  px-4 md:px-8 py-8 shadow-lg">
            <div className="w-full lg:w-3/4 bg-white rounded-2xl shadow-sm overflow-hidden p-6">
                <Image
                    className="w-full h-64 md:h-80 object-cover rounded-2xl"
                    src={image_url}
                    alt={name}
                    width={800}
                    height={400}
                    priority
                />

                <div className="p-6 md:p-10 flex flex-col lg:flex-row gap-8">
                    <div className="flex-2">
                        <h1 className="text-3xl font-semibold text-gray-900 mb-3">{name}</h1>
                        <p className="text-gray-600 leading-relaxed mb-6">{description}</p>
                        <div className="text-2xl font-bold text-gray-800">
                            ${price_per_night}
                            <span className="text-gray-500 text-lg font-medium"> / night</span>
                        </div>
                    </div>

                    <div className="flex-1 lg:max-w-md rounded-2xl shadow-lg p-6 bg-gray-50">
                        <BookingForm propertyId={id} propertyUserId={user_id} pricePerNight={price_per_night} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Property;
