export default function Hero() {
    return (
        <section
            className="hidden sm:flex mt-16 flex-col items-center justify-center h-[60vh] shadow-lg text-center bg-cover bg-top bg-no-repeat"
            style={{
                backgroundImage:
                    "url('https://images.unsplash.com/photo-1568930157403-9ad464e5f075?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dmluZXlhcmR8ZW58MHx8MHx8fDI%3D&auto=format&fit=crop&q=60&w=1920')",
            }}
        >
            <div className="p-8 rounded-2xl">
                <h1 className="text-4xl md:text-4xl font-bold text-white mb-4">
                    Find your next stay
                </h1>
                <p className="text-lg md:text-lg text-gray-100 mb-6 max-w-xl">
                    Discover unique homes, cabins, and apartments around the world.
                </p>

            </div>
        </section>
    );
}
