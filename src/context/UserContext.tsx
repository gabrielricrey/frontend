"use client";

import { createContext, PropsWithChildren, useState, useEffect, useContext } from "react";
import UserService from "@/utils/userService";
import AuthService from "@/utils/authService";
import { useRouter } from "next/navigation";
import { useHostMode } from "./HostModeContext";


type AuthActions = {
    register: (email: string, password: string) => Promise<void>,
    login: (email: string, password: string) => Promise<void>,
    logout: () => void
}

type UserState = {
    user: UserProfile | null,
    setUser: React.Dispatch<React.SetStateAction<UserProfile | null>>
    loading: boolean,
    failedLogin: boolean,
    actions: AuthActions
}

const UserContext = createContext<UserState | undefined>(undefined);

export function UserProvider({ children }: PropsWithChildren<{}>) {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [failedLogin, setFailedLogin] = useState(false);

    const router = useRouter();
    const hostMode = useHostMode();


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
            if (response.status === 400) {
                setFailedLogin(true);
                return;
            }
            if (!response.ok) {
                setFailedLogin(true);
                throw new Error("Login failed");
            }

            setFailedLogin(false);
            router.push('/');
            await fetchUserProfile();

        } catch (error) {
            console.error("Error login in: ", error);
        }
    }

    async function register(email: string, password: string) {
        try {
            const response = await new AuthService().register({ email, password });
            if (!response.ok) {
                throw new Error("Register failed");
            }
        } catch (error) {
            console.error("Error register user: ", error);
        }
    }

    async function logout() {
        await new AuthService().logout();
        setUser(null);
        hostMode.actions.turnOffHostMode();
    }

    return (
        <UserContext.Provider value={{ user, setUser, loading, failedLogin, actions: { login, register, logout } }}>
            {children}
        </UserContext.Provider>
    )

}


export function useUser() {
    const user = useContext(UserContext);

    return user;
}
