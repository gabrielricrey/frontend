

class UserService {
    private baseUrl: string;
    private userUrl: string;

    constructor() {
        this.baseUrl = process.env.BACKEND_BASE_URL || process.env.NEXT_PUBLIC_BACKEND_BASE_URL || "";
        this.userUrl = `${this.baseUrl}/me`;
    }

    async getUserProfile() {
        let url = `${this.userUrl}/`;

        return await fetch(url);
    }

    async editUserProfile() {
        // Fix later
        let url = `${this.userUrl}/`;

        return await fetch(url);
    }
}

export default UserService;