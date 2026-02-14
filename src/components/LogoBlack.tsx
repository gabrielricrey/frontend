import Link from "next/link"
import Image from "next/image"


export default function LogoBlack() {
    return (
        <Link href="/" className="flex items-center gap-1">
            <Image
                src="/logoBlack.svg"
                alt="Stay logo"
                width={120}
                height={40}
                priority/>
        </Link>
    )
}

