import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import IssuesStatusFilter from "./IssuesStatusFilter";
import IssuesFilter from "./IssuesFilter";

const IssueActions = () => {
  return (
    <Flex mb={"4"} justify={"between"} align={"center"}>
      <Flex gap={"4"}>
        <IssuesStatusFilter />
        <IssuesFilter />
      </Flex>
      <Button>
        <Link href="/issues/new">Add New Issue</Link>
      </Button>
    </Flex>
  );
};

export default IssueActions;
