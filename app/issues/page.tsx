import { prisma } from "@/prisma/client";
import { Status } from "@prisma/client";
import Pagination from "../components/Pagination";
import IssueTable from "./_components/issueTable";
import IssueActions from "./IssueActions";

interface Props {
  searchParams: Promise<{
    status: string;
    orderBy: "asc" | "desc";
    page: string;
  }>;
}

const IssuePage = async ({ searchParams }: Props) => {
  const { status, orderBy, page } = await searchParams;

  const statuses = Object.values(Status);
  const searchedStatus = statuses.includes(status as Status)
    ? status
    : undefined;

  const validateOrderBy =
    orderBy === "asc" || orderBy === "desc" ? orderBy : "asc";

  const pageSize = 10;
  const currentPage = parseInt(page) || 1;

  const issues = await prisma.issue.findMany({
    where: {
      status: searchedStatus as Status,
    },

    orderBy: {
      title: validateOrderBy,
    },

    skip: (currentPage - 1) * pageSize,
    take: pageSize,
  });

  const itemCount = await prisma.issue.count({
    where: { status: searchedStatus as Status },
  });

  return (
    <div>
      <IssueActions />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Pagination
        itemCount={itemCount}
        pageSize={pageSize}
        currentPage={currentPage}
      />
    </div>
  );
};

export const dynamic = "force-dynamic";

export default IssuePage;
