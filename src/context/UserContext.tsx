"use client";

import { createContext, PropsWithChildren, useState, useEffect, useContext } from "react";
import UserService from "@/utils/userService";
import AuthService from "@/utils/authService";


type AuthActions = {
    register: (email: string, password: string) => Promise<void>,
    login: (email: string, password: string) => Promise<void>,
    logout: () => void
}

type UserState = {
    user: UserProfile | null,
    setUser: React.Dispatch<React.SetStateAction<UserProfile | null>>
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

    useEffect(() => {
        fetchUserProfile();
    }, [])

    async function login(email: string, password: string) {
        try {
            const response = await new AuthService().login(email, password);
            if (!response.ok) {
                throw new Error("Login failed");
            }
            await fetchUserProfile();
        } catch (error) {
            console.error("Error login in: ", error);
        }
    }

    async function register(email: string, password: string) {
        try {
            const response = await new AuthService().register(email, password);
            if (!response.ok) {
                throw new Error("Register failed");
            }
        } catch (error) {
            console.error("Error register user: ", error);
        }
    }

    async function logout() {
        setUser(null);
    }

    return (
        <UserContext.Provider value={{ user, setUser, loading, actions: { login, register, logout } }}>
            {children}
        </UserContext.Provider>
    )

}


export function useUser() {
    const user = useContext(UserContext);

    return user;
}
