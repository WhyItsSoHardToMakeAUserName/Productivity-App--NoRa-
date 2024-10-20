"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NavBar() {
  const router = useRouter();

  const handle = async () => {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) console.log("API ERROR");

    router.push('/auth')
  };
  const links = [
    {
      name: "Finance",
      href: "finance-tracker",
    },
    {
      name: "ToDoList",
      href: "to-do-list",
    },
  ];
  return (
    <div className="flex justify-around absolute min-w-full">
      {links.map((link) => {
        return (
          <Link
            key={link.name}
            href={link.href}
            className=" opacity-30 hover:opacity-100 transition-opacity duration-200"
          >
            {link.name}
          </Link>
        );
      })}
      <button
        onClick={handle}
        className="opacity-30 hover:opacity-100 transition-opacity duration-200"
      >
        logout
      </button>
    </div>
  );
}
