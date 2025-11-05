export default function Hero() {
    return (
        <section
            className="hidden sm:flex mt-16 flex-col items-center justify-center h-[60vh] shadow-lg text-center bg-cover bg-top bg-no-repeat"

        >
            <div className="p-8 rounded-2xl">
                <h1 className="text-4xl md:text-4xl font-bold text-black mb-4">
                    Find your next stay
                </h1>
                <p className="text-lg md:text-lg text-black mb-6 max-w-xl">
                    Discover unique homes, cabins, and apartments around the world.
                </p>

            </div>
        </section>
    );
}
