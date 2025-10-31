import HostPropertyCard from "./HostPropertyCard"

type HostPropertiesProps = {
    data: PropertyPreview[],
}

export default async function HostProperties({ data }: HostPropertiesProps) {

    return (

        <ul>
            {data && data.map(property => <HostPropertyCard data={property} key={property.id} />)}
            {!data &&
                <p>You have no properties yet</p>
            }
        </ul>

    )

}