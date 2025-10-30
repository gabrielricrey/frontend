import Link from "next/link"

export default function BecomeHostLabel() {
    return (
        <Link href={'/host/become'}>
            <button className="border rounded-md p-2">Become a host</button>
        </Link>
    )
}