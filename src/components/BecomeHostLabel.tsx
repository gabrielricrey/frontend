import Link from "next/link";

export default function BecomeHostLabel() {
  return (
    <Link href="/host/become">
      <button className="border rounded-md p-2 text-white bg-gradient-to-br from-blue-600 via-indigo-600 to-slate-900 hover:cursor-pointer">
        Become a host
      </button>
    </Link>
  );
}