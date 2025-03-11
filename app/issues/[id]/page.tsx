import { prisma } from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditButton from "./EditButton";
import GoBackButton from "./GoBackButton";
import IssueDetail from "./IssueDetail";
import DeleteButton from "./DeleteButton";
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
          <Flex direction={"column"} gapY={"4"}>
            <EditButton issueId={issue.id} />
            <DeleteButton issueId={issue.id} />
          </Flex>
        </Box>
      </Grid>
    </>
  );
};

export default issueDetailPage;
