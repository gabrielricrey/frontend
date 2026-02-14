import Link from "next/link"
import Image from "next/image"

type LogoProps = {
    hostMode: boolean
}

export default function Logo({ hostMode }: LogoProps) {
    return (
        <Link href="/" className="flex items-center gap-1">
            <Image
                src="/logo.svg"
                alt="Stay logo"
                width={120}
                height={40}
                priority/>
        </Link>
    )
}

