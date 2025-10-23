import { createContext, PropsWithChildren, useState, useEffect } from "react";
import UserService from "@/utils/userService";
import AuthService from "@/utils/authService";


type AuthActions = {
    register: (email: string, password: string) => Promise<void>,
    login: (email: string, password: string) => Promise<void>,
    logout: () => void
}

type UserState = {
    user: UserProfile | null,
    loading: boolean,
    actions: AuthActions
}

const UserContext = createContext<UserState | undefined>(undefined);

export function UserProvider({ children }: PropsWithChildren<{}>) {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);


    async function fetchUserProfile() {
        setLoading(true);
        try {
            const response = await new UserService().getUserProfile();
            if (!response.ok) {
                throw new Error("Failed to fetch user");
            }
            const user: UserProfile = await response.json();
            setUser(user);
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }


    }

    async function login(email: string, password: string) {
        try {
            const response = await new AuthService().login(email, password);
            if (!response.ok) {
                throw new Error("Login failed");
            }
            await fetchUserProfile();
        } catch (error) {

        }
    }

    return (
        <></>
        // <UserContext.Provider value={{ user, loading }}>
        //     {children}
        // </UserContext.Provider>
    )

}