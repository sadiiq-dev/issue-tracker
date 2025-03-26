import { prisma } from "@/prisma/client";
import Pagination from "../components/Pagination";
import IssueTable from "./_components/issueTable";
import IssueActions from "./IssueActions";
import { Metadata } from "next";

interface Props {
  searchParams: Promise<{
    status: string | undefined;
    orderBy: "asc" | "desc";
    page: string;
  }>;
}

const IssuePage = async ({ searchParams }: Props) => {
  const { orderBy, page } = await searchParams;
  let { status } = await searchParams;

  if (
    status === "all" ||
    !["OPEN", "CLOSED", "IN_PROGRESS"].includes(status as string)
  )
    status = undefined;

  const validateOrderBy =
    orderBy === "asc" || orderBy === "desc" ? orderBy : "asc";

  const pageSize = 10;
  const currentPage = parseInt(page) || 1;

  const issues = await prisma.issue.findMany({
    where: {
      status: status,
    },

    orderBy: {
      createdAt: validateOrderBy,
    },

    skip: (currentPage - 1) * pageSize,
    take: pageSize,
  });

  const itemCount = await prisma.issue.count({
    where: { status: status },
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

export const metadata: Metadata = {
  title: "Issue Tracker - Issues",
  description: "View all the issues",
};

export default IssuePage;
