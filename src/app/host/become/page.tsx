import BecomeHostButton from "@/components/BecomeHostButton"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export default async function BecomeHost() {
    const cookieStore = await cookies();
    const hostMode = cookieStore.get("hostMode")?.value === 'true';

    if (hostMode) {
        redirect('/host');
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen gap-2">
            <h2 className="text-2xl">Just click the button to become a Host!</h2>
            <BecomeHostButton />
        </div>
    )
}