import LogoWhite from "./LogoWhite"
import Copyright from "./Copyright"

export default function
    () {
    return (
        <div className="hidden md:flex flex-col justify-center items-center gap-4 py-16 relative isolate">
            {/* Background gradient */}
            <div className="absolute inset-0 -z-20 bg-linear-to-br from-blue-600 via-indigo-600 to-slate-900" />

            {/* Subtle overlay */}
            <div className="absolute inset-0 -z-10 bg-black/40" />
            <LogoWhite />
            <Copyright />
        </div>
    )
}
