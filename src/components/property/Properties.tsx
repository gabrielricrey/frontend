import PropertyCard from "./PropertyCard";
import PropertyService from "@/utils/propertyService";

export default async function Properties() {
    const response = await new PropertyService().getProperties();
    const data = await response.json();

    if (!response.ok) {
        throw new Error("Error fetching properties");
    }

    const properties: Property[] = data.properties.data;

    return (
        <section className="max-w-7xl mx-auto px-4 py-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Explore popular stays
            </h2>

            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {properties.map((p) => (
                    <PropertyCard property={p} key={p.id} />
                ))}
            </ul>
        </section>
    );
}
