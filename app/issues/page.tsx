import { prisma } from "@/prisma/client";
import { Flex, Table } from "@radix-ui/themes";
import React from "react";
import IssueActions from "./IssueActions";
import { IssueStatusBadge, Link } from "../components/index";
import { Issue, Status } from "@prisma/client";
import NextLink from "next/link";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import Pagination from "../components/Pagination";
interface Props {
  searchParams: Promise<{
    status: string;
    orderBy: "asc" | "desc";
    page: string;
  }>;
}

const IssuePage = async ({ searchParams }: Props) => {
  const columns: {
    label: string;
    value: keyof Issue;
    className?: string;
  }[] = [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status", className: "hidden md:table-cell" },
    { label: "created", value: "createdAt", className: "hidden md:table-cell" },
  ];

  const awaitedSearchParams = await searchParams;
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
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.Cell key={column.value} className={column.className}>
                <Flex gap={"4"}>
                  {column.label}
                  {orderBy === "asc" && <AiOutlineArrowUp />}
                  {orderBy === "desc" && <AiOutlineArrowDown />}
                </Flex>
              </Table.Cell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="mt-1 md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
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
