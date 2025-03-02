"use client";
import Link from "next/link";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import { usePathname } from "next/navigation";
import classNames from "classnames";
const NavBar = () => {
  const currentPath = usePathname();
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
            className={classNames({
              "text-zinc-900": currentPath === link.href,
              "text-zinc-400": currentPath !== link.href,
              " hover:text-zinc-800 transition-colors": true,
            })}
          >
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
