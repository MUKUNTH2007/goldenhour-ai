"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-red-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <h1 className="text-2xl font-bold">
          GoldenHour AI
        </h1>

        {/* Links */}
        <ul className="flex gap-6 font-medium">
          
          <li>
            <Link href="/" className = "hover:text-grey-200" >Home</Link>
          </li>

          <li>
            <Link href="/report" className = "hover:text-grey-200">Report Accident</Link>
          </li>

          <li>
            <Link href="/severity" className = "hover:text-grey-200">Severity</Link>
          </li>

          <li>
            <Link href="/hospitals" className = "hover:text-grey-200">Hospitals</Link>
          </li>

          <li>
            <Link href="/first-aid" className = "hover:text-grey-200">First Aid AI</Link>
          </li>

          <li>
            <Link href="/dashboard" className = "hover:text-grey-200">Dashboard</Link>
          </li>

        </ul>

      </div>
    </nav>
  );
}