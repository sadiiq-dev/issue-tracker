import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import { prisma } from "@/prisma/client";
import { Box, Button, Card, Flex, Grid, Heading } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import React from "react";
import { Pencil2Icon } from "@radix-ui/react-icons";
import Link from "next/link";
import EditButton from "./EditButton";
import GoBackButton from "./GoBackButton";
import IssueDetail from "./IssueDetail";
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
      <Grid columns={{ initial: "1", md: "2" }} mt={"5"}>
        <Box>
          <IssueDetail issue={issue} />
        </Box>
        <Box mt={"4"}>
          <EditButton issueId={issue.id} />
        </Box>
      </Grid>
    </>
  );
};

export default issueDetailPage;
