'use client';

export default function ErrorPage({ error, reset }: { error: Error; reset: () => void }) {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center">
            <h1 className="text-2xl font-semibold mb-2">Something went wrong</h1>
            <p className="text-gray-600 mb-4">{error.message}</p>
            <button
                onClick={() => reset()}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
                Try again
            </button>
        </div>
    );
}
