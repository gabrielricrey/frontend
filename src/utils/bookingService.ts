type UpdateBooking = {
    bookingId: string,
    checkInDate?: string,
    checkOutDate?: string,
    status?: string
}

class BookingService {
    private baseUrl: string;
    private bookingUrl: string;

    constructor() {
        this.baseUrl = process.env.BACKEND_BASE_URL || process.env.NEXT_PUBLIC_BACKEND_BASE_URL || "";
        this.bookingUrl = `${this.baseUrl}/booking`
    }

    async createBooking(property_id: string, check_in_date: string, check_out_date: string,) {
        let url = this.bookingUrl
        return await fetch(url, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ check_in_date, check_out_date, property_id })
        })

    }

    async getBookings() {
        let url = this.bookingUrl;
        return await fetch(url, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-type': 'application/json'
            }
        });
    }

    async getBooking(id: string) {
        let url = `${this.bookingUrl}/${id}`;
        return await fetch(url, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-type': 'application/json'
            }
        });
    }


    async updateBooking({ bookingId, checkInDate, checkOutDate, status }: UpdateBooking) {

        let check_in_date = checkInDate;
        let check_out_date = checkOutDate;

        const updateData = status
            ? { status }
            : { check_in_date, check_out_date };

        let url = `${this.bookingUrl}/${bookingId}`;

        return await fetch(url, {

            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(updateData)

        });
    }
}

export default BookingService;