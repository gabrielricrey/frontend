import Hero from "@/components/Hero";
import Properties from "@/components/property/Properties";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";



export default async function Home() {

  const cookieStore = await cookies();
  const hostMode = cookieStore.get("hostMode")?.value === 'true';

  if (hostMode) {
    redirect('/host');
  };

  return (
    <div>
      <Hero />
      <main>
        <Properties />
      </main>
    </div>
  );



}
