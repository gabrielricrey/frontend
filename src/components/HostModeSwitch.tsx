"use client";

import { useRouter } from "next/navigation";
import { useHostMode } from "@/context/HostModeContext";

export const HostModeSwitch = () => {
    const { hostMode, actions } = useHostMode();
    const router = useRouter();

    const toggle = () => {
        const newMode = !hostMode;

        if (newMode) {
            actions.turnOnHostMode();
            router.push("/host");
        } else {
            actions.turnOffHostMode();
            router.push("/");
        }
    };

    return (
        <div className="flex gap-2 items-center">

            <p>Host Mode</p>
            <label className="flex items-center cursor-pointer">
                <input type="checkbox" checked={hostMode} onChange={toggle} className="sr-only" />
                <span className={`w-10 h-6 flex items-center rounded-full p-1 transition-colors ${hostMode ? "bg-green-500" : "bg-gray-300"}`}>
                    <span className={`w-4 h-4 bg-white rounded-full transform transition-transform ${hostMode ? "translate-x-4" : ""}`} />
                </span>
            </label>
        </div>
    );
};
