"use client";

import { createContext, useContext, PropsWithChildren, useState, useEffect } from "react";
import Cookies from "js-cookie"


type HostModeState = {
    hostMode: boolean,
    actions: {
        turnOnHostMode: () => void,
        turnOffHostMode: () => void,
    }
}

const HostModeContext = createContext<HostModeState | undefined>(undefined);

export function HostModeProvider({ children }: PropsWithChildren) {

    const [hostMode, setHostMode] = useState<boolean>(false);

    useEffect(() => {
        const cookieValue = Cookies.get("hostMode");
        if (cookieValue === 'true') {
            setHostMode(true)
        }
    }, [])

    const updateCookie = (value: boolean) => {
        Cookies.set("hostMode", String(value), { path: "/", sameSite: "strict" })
    }


    const turnOnHostMode = () => {
        setHostMode(true);
        updateCookie(true);
    }

    const turnOffHostMode = () => {
        setHostMode(false);
        updateCookie(false);
    }

    const value: HostModeState = {
        hostMode,
        actions: {
            turnOnHostMode,
            turnOffHostMode
        }
    }

    return (
        <HostModeContext.Provider value={value}>
            {children}
        </HostModeContext.Provider>
    )
}

export function useHostMode() {
    const hostmode = useContext(HostModeContext);
    if (!hostmode) {
        throw new Error("useHostMode must be used within a HostModeProvider");
    }
    return hostmode;
}