import React from "react";
import IssueForm from "../../_components/IssueForm";
import { prisma } from "@/prisma/client";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

const Page = async ({ params }: Props) => {
  const id = parseInt((await params).id);
  const issue = await prisma.issue.findUnique({
    where: { id },
  });

  if (!issue) {
    notFound();
  }

  return <IssueForm issue={issue} />;
};

export default Page;
