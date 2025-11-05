import Booking from "@/components/booking/Booking";

type BookingPageProps = {
    params: {
        id: string;
    }
}

const BookingPage = async ({ params }: BookingPageProps) => {
    const { id } = await params;


    return (
        <Booking id={id} />
    )
}


export default BookingPage;