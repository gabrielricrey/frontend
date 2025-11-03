import PropertyCard from "./PropertyCard";
import PropertyService from "@/utils/propertyService";




export default async function Properties() {

    const response = await new PropertyService().getProperties();
    const data = await response.json();
    console.log(data);

    if (!response.ok) {
        throw new Error("Error fetching properties");
    }

    const properties: Property[] = data.properties.data;
    return (
        <div>
            <h3>Properties</h3>
            <ul className="flex">
                {properties.map(p => <PropertyCard property={p} key={p.id} />)}
            </ul>
        </div>
    )
}
