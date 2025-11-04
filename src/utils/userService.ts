

class UserService {
    private baseUrl: string;
    private userUrl: string;

    constructor() {
        this.baseUrl = process.env.BACKEND_BASE_URL || process.env.NEXT_PUBLIC_BACKEND_BASE_URL || "";
        this.userUrl = `${this.baseUrl}/me`;
    }

    async getUserProfile() {
        let url = `${this.userUrl}/`;

        return await fetch(url, { credentials: 'include' });
    }

    async editUserProfile({ is_host, first_name, last_name, avatar_url }: Partial<UserProfile>) {
        let url = `${this.userUrl}/`;

        const updateData: Record<string, any> = {};
        if (is_host !== undefined) updateData.is_host = is_host;
        if (first_name !== undefined) updateData.first_name = first_name;
        if (last_name !== undefined) updateData.last_name = last_name;
        if (avatar_url !== undefined) updateData.avatar_url = avatar_url;

        console.log("Update data: ", updateData);

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

export default UserService;