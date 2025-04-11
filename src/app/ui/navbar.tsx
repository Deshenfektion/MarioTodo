import Link from "next/link";

function Navbar() {
  return (
    <button className="flex-end bg-gray-700 p-1.5">
      <Link href="/settings">⚙️</Link>
    </button>
  );
}

export default Navbar;
