import { Box } from "@radix-ui/themes";
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const loadingNewIssue = () => {
  return (
    <Box className="mx-x-[30rem]">
      <p>loading...</p>
      <Skeleton />
      <Skeleton height={"18rem"} />
    </Box>
  );
};

export default loadingNewIssue;
