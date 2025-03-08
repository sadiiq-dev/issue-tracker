import { Link as RadixLink } from "@radix-ui/themes";
import NextLink from "next/link";
import React, { ReactNode } from "react";

interface Props {
  href: string;
  children: ReactNode;
}

const pageLink = ({ href, children }: Props) => {
  return (
    <NextLink href={href} legacyBehavior>
      <RadixLink>{children}</RadixLink>
    </NextLink>
  );
};

export default pageLink;
