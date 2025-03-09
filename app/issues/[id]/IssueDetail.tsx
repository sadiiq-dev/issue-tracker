import { IssueStatusBadge } from "@/app/components";
import { Issue } from "@prisma/client";
import { Card, Flex, Heading } from "@radix-ui/themes";
import React from "react";

const IssueDetail = ({ issue }: { issue: Issue }) => {
  return (
    <>
      <Heading>{issue.title}</Heading>
      <Flex gap={"10px"} className="items-center" my={"3"}>
        <IssueStatusBadge status={issue.status} />
        <p> {issue.createdAt.toDateString()}</p>
      </Flex>
      <Card className="w-120"> {issue.description}</Card>
    </>
  );
};

export default IssueDetail;
