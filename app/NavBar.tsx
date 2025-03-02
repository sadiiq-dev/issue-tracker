import Link from "next/link";
import React from "react";
import { AiFillBug } from "react-icons/ai";

const NavBar = () => {
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];
  return (
    <nav className="flex justify-between items-center shadow p-2 h-14">
      <Link href={"/"}>
        <AiFillBug size={"30px"} />
      </Link>
      <ul className="flex space-x-3 space-y-2.5">
        {links.map((link) => (
          <li
            key={link.href}
            className="text-zinc-400 hover:text-zinc-800 transition-colors"
          >
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
