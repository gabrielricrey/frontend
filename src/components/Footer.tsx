import LogoWhite from "./LogoWhite"
import Copyright from "./Copyright"

export default function
    () {
    return (
        <div className="hidden md:flex flex-col justify-center items-center gap-4 py-16 bg-black">
            <LogoWhite />
            <Copyright />
        </div>
    )
}
