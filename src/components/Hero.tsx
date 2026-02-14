import { HomeIcon } from "@heroicons/react/24/solid"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="relative isolate flex items-center justify-center min-h-[75vh] overflow-hidden px-6">
      
      {/* Background gradient */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-br from-blue-600 via-indigo-600 to-slate-900" />
      
      {/* Subtle overlay */}
      <div className="absolute inset-0 -z-10 bg-black/40" />

      <div className="max-w-3xl text-center text-white">
        
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg">
            <HomeIcon className="h-8 w-8 text-white" />
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight mb-6">
          Find your next <span className="text-blue-300">stay</span>
        </h1>

        <p className="text-lg md:text-xl text-white/80 mb-8">
          Discover unique places to stay around the world — from cozy cabins to luxury villas.
        </p>

       
      </div>
    </section>
  )
}
