import Link from "next/link"

type LogoProps = {
    hostMode: boolean
}

export default function Logo({ hostMode }: LogoProps) {
    return (
        <Link href="/" className="flex items-center gap-1">
            <p className="text-2xl font-bold text-black tracking-tight italic">Stay{hostMode && <span className="text-blue-500">host</span>}</p>
        </Link>
    )
}

