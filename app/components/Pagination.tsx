"use client";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Box, Button, Flex, Text } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

interface Props {
  itemCount: number; // total page
  pageSize: number; // page per size
  currentPage: number; // the page you are in
}

const Pagination = ({ currentPage, itemCount, pageSize }: Props) => {
  let pageCount = Math.ceil(itemCount / pageSize); // pages you will get
  const searchParams = useSearchParams();
  const router = useRouter();
  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push("?" + params.toString());
  };
  return (
    <Flex align={"center"} gap={"2"}>
      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === 1}
        onClick={() => changePage(1)}
      >
        <DoubleArrowLeftIcon />
      </Button>
      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === 1}
        onClick={() => changePage(currentPage - 1)}
      >
        <ChevronLeftIcon />
      </Button>
      <Box>{currentPage}</Box>
      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === pageSize}
        onClick={() => changePage(currentPage + 1)}
      >
        <ChevronRightIcon />
      </Button>
      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === pageSize}
        onClick={() => changePage(pageCount)}
      >
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  );
};

export default Pagination;
