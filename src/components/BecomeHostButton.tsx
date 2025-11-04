"use client";
import UserService from "@/utils/userService";
import { useRouter } from "next/navigation";
import { useHostMode } from "@/context/HostModeContext";
import { useUser } from "@/context/UserContext";

export default function BecomeHostButton() {

    const router = useRouter();
    const hostMode = useHostMode();
    const user = useUser();

    const handleClick = async () => {
        try {
            const response = await new UserService().editUserProfile({ is_host: true })

            if (!response.ok) {
                throw new Error("Error updating is_host");
            }

            console.log("success");
            const data = await response.json();
            const updatedUserData: UserProfile = data.profile;
            user?.setUser(updatedUserData);
            hostMode.actions.turnOnHostMode();
            router.push('/host');


        } catch (error) {

            console.error("Error:", error);
        }

    }
    return (

        <button onClick={handleClick} className="border cursor-pointer bg-blue-500 text-white rounded-md p-2">Become a host</button>

    )
}