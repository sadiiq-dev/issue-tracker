import { GoBackButton } from "@/app/components/index";
import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import { prisma } from "@/prisma/client";
import { Card, Flex, Heading } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: { id: string };
}

const issueDetailPage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue) notFound();
  return (
    <>
      <GoBackButton />
      <div className="mt-8">
        <Heading>{issue.title}</Heading>
        <Flex gap={"10px"} className="items-center" my={"3"}>
          <IssueStatusBadge status={issue.status} />
          <p> {issue.createdAt.toDateString()}</p>
        </Flex>
        <Card className="w-120"> {issue.description}</Card>
      </div>
    </>
  );
};

export default issueDetailPage;
