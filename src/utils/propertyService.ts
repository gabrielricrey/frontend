import axios from "axios";

class PropertyService {
    private baseUrl: string;
    private propertyUrl: string;

    constructor() {
        this.baseUrl = process.env.BACKEND_BASE_URL || process.env.NEXT_PUBLIC_BACKEND_BASE_URL || "";
        this.propertyUrl = `${this.baseUrl}/property`;
    }

    async getProperties() {
        return await axios.get(this.propertyUrl);
    }

    async getProperty(id: string) {
        let url = `${this.propertyUrl}/${id}`;
        return await axios.get(url);
    }

}

export default PropertyService;