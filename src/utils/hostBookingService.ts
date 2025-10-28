

class HostBookingService {
    private baseUrl: string;
    private bookingUrl: string;

    constructor() {
        this.baseUrl = process.env.BACKEND_BASE_URL || process.env.NEXT_PUBLIC_BACKEND_BASE_URL || "";
        this.bookingUrl = `${this.baseUrl}/host/booking`
    }


    async updateBooking(bookingId: string, status: string) {

        let url = `${this.bookingUrl}/${bookingId}`;
        console.log(status);
        return await fetch(url, {

            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status }),
        });
    }
}

export default HostBookingService;