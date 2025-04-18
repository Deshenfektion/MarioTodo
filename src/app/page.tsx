import Image from "next/image";
import Link from "next/link";
import Navbar from "./ui/navbar";
import Task from "./ui/task";

export default function Page() {
  return (
    <>
      {/* Whole page */}
      <div className="flex flex-col min-h-screen">
        {/* Title Section */}
        <main className="flex-grow">
          <div className="flex justify-center p-3">
            <h1 className="font-extrabold text-center m-1.5">To-Do List</h1>
            <Image
              src="/favicon.png"
              width={50}
              height={50}
              alt="To-Do List Logo"
            />
          </div>
          {/* Static dummy tasks */}
          <Task></Task>
          <Task></Task>
          <Task></Task>
        </main>

        {/* Footer for icon credits */}
        <div className="text-xs text-center p-2">
          <a
            href="https://www.flaticon.com/free-icons/to-do"
            title="to do icons"
          >
            To do icons created by Freepik - Flaticon
          </a>
        </div>
      </div>
    </>
  );
}
