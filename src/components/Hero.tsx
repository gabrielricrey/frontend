import { HomeIcon } from "@heroicons/react/16/solid";

export default function Hero() {
    return (
        <section
            className="relative flex items-center justify-center h-[50vh] overflow-hidden mt-16 shadow-lg"
        >


            <div className="relative z-10 text-center text-black px-8">
                <h1 className="text-4xl md:text-4xl font-bold mb-4 drop-shadow-lg">
                    Find your next stay!
                </h1>
                <p className="text-md italic mb-4">We provide what you need to enjoy your holiday with family</p>
                <button className="rounded-2xl w-30 bg-black text-white font-medium p-2">Sign up</button>
                {/* <div className="flex justify-center mt-2">
                    <HomeIcon className="size-8" />
                </div> */}

            </div>
        </section>

    );
}
