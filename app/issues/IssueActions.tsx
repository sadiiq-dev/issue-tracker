import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import IssuesStatusFilter from "./IssuesStatusFilter";
import IssuesSort from "./issuesSort";

const IssueActions = () => {
  return (
    <Flex mb={"5"} justify={"between"} align={"center"} wrap={"wrap"} gap={"4"}>
      <Flex gap={"4"}>
        <IssuesStatusFilter />
        <IssuesSort />
      </Flex>
      <Button>
        <Link href="/issues/new">Add New Issue</Link>
      </Button>
    </Flex>
  );
};

export default IssueActions;
