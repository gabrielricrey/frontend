import axios from "axios";



export default async function Home() {
  const response = await axios.get("http://localhost:3000/property");
  const { data: { properties: { data: properties } } } = response;


  return (
    <>
      <ul>


      </ul>
    </>
  );
}
