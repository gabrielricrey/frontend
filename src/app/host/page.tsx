import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export default async function HostStartPage() {
    const cookieStore = await cookies();
    const hostMode = cookieStore.get("hostMode")?.value === 'true';

    if (!hostMode) {

        redirect('/');
    }
    return (
        <h1>
            Host StartPage
        </h1>
    )
}