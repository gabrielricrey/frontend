
import HostBookingCard from "./HostBookingCard";
import BookingCard from "./BookingCard";

type BookingsProp = {
    data?: Booking[],
    bookingWithPropertyAndUSer?: BookingWithUserAndProperty[];
    isHostBookings?: boolean;
}

const Bookings = ({ data, isHostBookings, bookingWithPropertyAndUSer }: BookingsProp) => {
    if (!isHostBookings) {
        const bookings = data!;
        return (
            <div>
                <ul>
                    {bookings.map(b => <BookingCard booking={b} key={b.id} />)}
                </ul>
            </div>
        )

    } else {
        const hostBookings = bookingWithPropertyAndUSer!;
        console.log(hostBookings);
        return (
            <div>
                <ul>
                    {hostBookings.map(b => <HostBookingCard booking={b} key={b.id} />)}
                </ul>
            </div>
        )
    }


}

export default Bookings