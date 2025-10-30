import Hero from "@/components/Hero";
import Properties from "@/components/property/Properties";
import PropertyService from "@/utils/propertyService";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";



export default async function Home() {

  const cookieStore = await cookies();
  const hostMode = cookieStore.get("hostMode")?.value === 'true';

  if (hostMode) {
    redirect('/host');
  };
  try {
    const response = await new PropertyService().getProperties();
    const data = await response.json();

    if (!response.ok) {
      throw new Error("Error fetching properties");
    }

    return (
      <>
        <Hero />
        <main>
          <Properties data={data.properties.data} />
        </main>
      </>
    );
  } catch (error) {
    console.error("Error:", error);
    return (
      <>
        <Hero />
        <main>
          <p>Error fetching properties</p>
        </main>
      </>
    )

  }

}
