import { GoBackButton } from "@/app/components/index";
import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import { prisma } from "@/prisma/client";
import { Box, Button, Card, Flex, Grid, Heading } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import React from "react";
import { Pencil2Icon } from "@radix-ui/react-icons";
import Link from "next/link";
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
          <Heading>{issue.title}</Heading>
          <Flex gap={"10px"} className="items-center" my={"3"}>
            <IssueStatusBadge status={issue.status} />
            <p> {issue.createdAt.toDateString()}</p>
          </Flex>
          <Card className="w-120"> {issue.description}</Card>
        </Box>
        <Box mt={"4"}>
          <Link href={`/issues/${issue.id}/edit`}>
            <Button className="cursor-pointer">
              <Pencil2Icon />
              Edit The Issue
            </Button>
          </Link>
        </Box>
      </Grid>
    </>
  );
};

export default issueDetailPage;
