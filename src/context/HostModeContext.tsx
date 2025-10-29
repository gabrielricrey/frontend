"use client";

import { createContext, useContext, PropsWithChildren, useState } from "react";


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

    const turnOnHostMode = () => {
        setHostMode(true);
    }

    const turnOffHostMode = () => {
        setHostMode(false);
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