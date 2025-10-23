

class BookingService {
    private baseUrl: string;
    private bookingUrl: string;

    constructor() {
        this.baseUrl = process.env.BACKEND_BASE_URL || process.env.NEXT_PUBLIC_BACKEND_BASE_URL || "";
        this.bookingUrl = `${this.baseUrl}/booking`
    }

    async createBooking(check_in_date: string, check_out_date: string, property_id: string) {
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
}

export default BookingService;