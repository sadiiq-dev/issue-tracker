import { prisma } from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditButton from "./EditButton";
import GoBackButton from "./GoBackButton";
import IssueDetail from "./IssueDetail";
import DeleteButton from "./DeleteButton";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import SelectAssignee from "./SelectAssignee";
import { cache } from "react";

interface Props {
  params: Promise<{ id: string }>;
}

const fetchUser = cache((userId: number) =>
  prisma.issue.findUnique({ where: { id: userId } })
);

const issueDetailPage = async ({ params }: Props) => {
  const id = parseInt((await params).id);
  const session = await getServerSession(authOptions);
  const issue = await fetchUser(id);
  if (!issue) notFound();
  return (
    <>
      <GoBackButton />
      <Grid columns={{ initial: "1", md: "2" }} mt={"5"}>
        <Box>
          <IssueDetail issue={issue} />
        </Box>
        <Box mt={"4"}>
          {session && (
            <Flex direction={"column"} gapY={"4"}>
              <SelectAssignee issue={issue} />
              <EditButton issueId={issue.id} />
              <DeleteButton issueId={issue.id} />
            </Flex>
          )}
        </Box>
      </Grid>
    </>
  );
};

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = parseInt((await params).id);
  const issue = await fetchUser(id);

  return {
    title: issue?.title,
    description: "Details of issue " + issue?.id,
  };
};

export default issueDetailPage;
