import PropertyCard from "./PropertyCard";


type PropertiesProps = {
    data: Property[]
};

const Properties = ({ data }: PropertiesProps) => {
    return (
        <div>
            <h3>Properties</h3>
            <ul className="flex">
                {data.map(p => <PropertyCard property={p} key={p.id} />)}
            </ul>
        </div>
    )
}

export default Properties