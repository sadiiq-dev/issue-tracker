import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Box, Button, Flex, Text } from "@radix-ui/themes";
import React from "react";

interface Props {
  itemCount: number; // total page
  pageSize: number; // page per size
  currentPage: number; // the page you are in
}

const Pagination = ({ currentPage, itemCount, pageSize }: Props) => {
  let pageCount = Math.ceil(itemCount / pageSize); // pages you will get
  return (
    <Flex align={"center"} gap={"2"}>
      <Button color="gray" variant="soft" disabled={currentPage === 1}>
        <DoubleArrowLeftIcon />
      </Button>
      <Button color="gray" variant="soft" disabled={currentPage === 1}>
        <ChevronLeftIcon />
      </Button>
      <Box>{currentPage}</Box>
      <Button color="gray" variant="soft" disabled={currentPage === pageSize}>
        <DoubleArrowRightIcon />
      </Button>
      <Button color="gray" variant="soft" disabled={currentPage === pageSize}>
        <ChevronRightIcon />
      </Button>
    </Flex>
  );
};

export default Pagination;
