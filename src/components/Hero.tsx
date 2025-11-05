export default function Hero() {
    return (
        <section
            className="relative flex items-center justify-center h-[50vh] overflow-hidden mt-16 shadow-lg"
        >
            <div className="absolute inset-0 bg-linear-to-t from-black/0 via-black/10 to-transparent" />

            <div className="relative z-10 text-center text-black px-8">
                <h1 className="text-4xl md:text-4xl font-bold mb-4 drop-shadow-lg">
                    Find your next stay
                </h1>
                <p className="text-lg md:text-lg italic mb-8 max-w-xl mx-auto text-black">
                    Discover unique homes, cabins, and apartments around the world.
                </p>

            </div>
        </section>

    );
}
