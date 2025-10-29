

class HostPropertyService {
    private baseUrl: string;
    private propertyUrl: string;

    constructor() {
        this.baseUrl = process.env.BACKEND_BASE_URL || process.env.NEXT_PUBLIC_BACKEND_BASE_URL || "";
        this.propertyUrl = `${this.baseUrl}/host/property`;
    }

    async getProperties() {
        return await fetch(this.propertyUrl);
    }

    async getProperty(id: string) {
        let url = `${this.propertyUrl}/${id}`;
        return await fetch(url);
    }

    async createProperty(data: NewProperty) {
        let url = this.propertyUrl;

        return await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(data),
        })

    }

    async deleteProperty(id: string) {
        let url = `${this.propertyUrl}/${id}`;

        return await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        })

    }

}

export default HostPropertyService;