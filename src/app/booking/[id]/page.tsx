import Booking from "@/components/booking/Booking";

type BookingPageProps = {
    params: {
        id: string;
    }
}

const BookingPage = async ({ params }: BookingPageProps) => {
    const id = params.id;


    return (
        <div className="flex justify-center">
            <Booking id={id} />
        </div>
    )
}


export default BookingPage;