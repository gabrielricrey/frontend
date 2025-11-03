interface NewProperty {
    name: string,
    description: string,
    price_per_night: number,
    user_id?: string,
    is_available: boolean,
    image_url: string,
}

interface Property extends NewProperty {
    id: string,
    user_id: string,
    created_at: string,
    updated_at: string,
}

interface PropertyWithBookings extends Property {
    bookings: Booking[]
}

type PropertyPreview = Pick<Property, "id" | "name" | "image_url">


