import GoBackButton from "@/app/components/GoBackButton";
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
      <div className="mt-5">
        <Heading>{issue.title}</Heading>
        <Flex gap={"10px"} className="items-center" my={"2"}>
          <IssueStatusBadge status={issue.status} />
          <p> {issue.createdAt.toDateString()}</p>
        </Flex>
        <Card> {issue.description}</Card>
      </div>
    </>
  );
};

export default issueDetailPage;
