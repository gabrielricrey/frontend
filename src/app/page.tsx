import Hero from "@/components/Hero";
import Properties from "@/components/property/Properties";
import PropertyService from "@/utils/propertyService";



export default async function Home() {

  const response = await new PropertyService().getProperties();


  return (
    <>
      <Hero />
      <main>
        <Properties data={response.data.properties.data} />
      </main>
    </>
  );
}
