import BookingForm from "@/components/booking/BookingForm";
import Booking from "@/components/booking/Booking";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

type BookingPageProps = {
    params: {
        id: string;
    }
}

const BookingPage = async ({ params }: BookingPageProps) => {
    const id = params.id;


    return (
        <div>
            <Booking id={id} />
        </div>
    )
}


export default BookingPage;