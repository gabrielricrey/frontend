import { HomeIcon } from "@heroicons/react/16/solid";

export default function Hero() {
    return (
        <section
            className="relative flex items-center justify-center h-[70vh] overflow-hidden mt-16 shadow-lg"
        >


            <div className="relative z-10 text-center text-black px-8">
                <h1 className="text-4xl md:text-4xl font-bold mb-4 drop-shadow-lg">
                    Find your next stay!
                </h1>
                <p className="text-md mb-4">We provide what you need to enjoy your holiday with family</p>            
            </div>
        </section>

    );
}
