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
        <div className="flex justify-center items-center h-screen">
            <BecomeHostButton />
        </div>
    )
}