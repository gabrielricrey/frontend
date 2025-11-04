export default function Hero() {
    return (
        <section className="hidden sm:flex flex-col items-center justify-center h-[60vh] bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-lg text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
                Find your next stay
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-6 max-w-xl">
                Discover unique homes, cabins, and apartments around the world.
            </p>
            <button className="bg-gray-900 text-white font-semibold px-6 py-3 rounded-full hover:bg-gray-800 transition">
                Explore listings
            </button>
        </section>
    );
};

