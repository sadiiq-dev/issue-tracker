"use client";
import Link from "next/link";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import { usePathname } from "next/navigation";
import classNames from "classnames";
import { Avatar, Box, DropdownMenu, Flex, Text } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import { Spinner } from "./components";

const NavBar = () => {
  return (
    <nav className="flex justify-between items-center shadow p-2 h-14 mb-4">
      <Flex className="space-x-5">
        <Link href={"/"}>
          <AiFillBug size={"30px"} />
        </Link>
        <NavLinks />
      </Flex>
      <AuthStatus />
    </nav>
  );
};

const NavLinks = () => {
  const currentPath = usePathname();
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  return (
    <ul className="flex space-x-3 space-y-2.5">
      {links.map((link) => (
        <li
          key={link.href}
          className={classNames({
            "text-zinc-900": currentPath === link.href,
            "text-zinc-400": currentPath !== link.href,
            "hover:text-zinc-800 transition-colors": true,
          })}
        >
          <Link href={link.href}>{link.label}</Link>
        </li>
      ))}
    </ul>
  );
};

const AuthStatus = () => {
  const { data: session, status } = useSession();

  if (status === "loading") return <Spinner />;

  if (status === "unauthenticated")
    return (
      <Link
        href={"/api/auth/signin"}
        className="text-zinc-400 hover:text-zinc-800 transition-colors "
      >
        Log In
      </Link>
    );

  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <div style={{ cursor: "pointer" }}>
            <Avatar
              src={session!.user!.image!}
              fallback="?"
              radius="full"
              size="2"
              style={{
                border: "2px solid #fff",
                boxShadow: "0 0 0 2px #000",
              }}
              referrerPolicy="no-referrer"
            />
          </div>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content style={{ minWidth: "200px" }}>
          <DropdownMenu.Item>
            <Text>{session!.user!.email}</Text>
          </DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item>
            <Link href={"/api/auth/signout"}>Log Out</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};

export default NavBar;
