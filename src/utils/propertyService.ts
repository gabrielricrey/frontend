
class PropertyService {
    private baseUrl: string;
    private propertyUrl: string;

    constructor() {
        this.baseUrl = process.env.BACKEND_BASE_URL || process.env.NEXT_PUBLIC_BACKEND_BASE_URL || "";
        this.propertyUrl = `${this.baseUrl}/property`;
    }

    async getProperties() {
        return await fetch(this.propertyUrl);
    }

    async getProperty(id: string) {
        let url = `${this.propertyUrl}/${id}`;
        return await fetch(url);
    }

}

export default PropertyService;