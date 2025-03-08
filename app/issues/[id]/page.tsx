import GoBackButton from "@/app/components/GoBackButton";
import { prisma } from "@/prisma/client";
import { Button } from "@radix-ui/themes";
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
      <div>
        <p> {issue.title}</p>
        <p> {issue.description}</p>
        <p> {issue.status}</p>
        <p> {issue.createdAt.toDateString()}</p>
      </div>
    </>
  );
};

export default issueDetailPage;
