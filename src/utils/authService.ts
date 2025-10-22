import axios from "axios";

class AuthService {
    private baseUrl: string;
    private authUrl: string;

    constructor() {
        this.baseUrl = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_BASE_URL || "";
        this.authUrl = `${this.baseUrl}/auth`;
    }

    async login(email: string, password: string) {
        let url = `${this.authUrl}/login`;

        return await axios.post(url, { email, password }, { withCredentials: true });
    }

    async register(email: string, password: string) {
        let url = `${this.authUrl}/register`;

        return await axios.post(url, { email, password }, { withCredentials: true });
    }
}

export default AuthService;