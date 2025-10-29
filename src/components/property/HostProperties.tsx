import HostPropertyCard from "./HostPropertyCard"

type HostPropertiesProps = {
    data: PropertyPreview[],
}

export default async function HostProperties({ data }: HostPropertiesProps) {

    return (
        <div>
            <ul>
                {data.map(property => <HostPropertyCard data={property} key={property.id} />)}
            </ul>
        </div>
    )

}