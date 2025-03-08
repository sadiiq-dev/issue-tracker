"use client";
import { Button } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React from "react";
import { RiArrowGoBackFill } from "react-icons/ri";

const GoBackButton = () => {
  const router = useRouter();
  return (
    <div>
      <Button
        asChild
        onClick={() => {
          router.push("/issues");
        }}
      >
        <div className="cursor-pointer">
          <RiArrowGoBackFill />
          Go back
        </div>
      </Button>
    </div>
  );
};

export default GoBackButton;
