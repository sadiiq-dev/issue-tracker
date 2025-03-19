import { prisma } from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import React from "react";
import IssueActions from "./IssueActions";
import { IssueStatusBadge, Link } from "../components/index";
import { Issue, Status } from "@prisma/client";
import NextLink from "next/link";
import { AiOutlineArrowUp } from "react-icons/ai";
interface Props {
  searchParams: Promise<{ status: string; orderBy: keyof Issue }>;
}

const IssuePage = async ({ searchParams }: Props) => {
  const awaitedSearchParams = await searchParams;
  const { status, orderBy } = await searchParams;

  const statuses = Object.values(Status);
  const searchedStatus = statuses.includes(status as Status)
    ? status
    : undefined;

  const issues = await prisma.issue.findMany({
    where: {
      status: searchedStatus as Status,
    },
  });

  const column: {
    label: string;
    value: keyof Issue;
    className?: string;
  }[] = [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status", className: "hidden md:table-cell" },
    { label: "created", value: "createdAt", className: "hidden md:table-cell" },
  ];

  return (
    <div>
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {column.map((column) => (
              <Table.Cell key={column.value} className={column.className}>
                <NextLink
                  href={{
                    query: { ...awaitedSearchParams, orderBy: column.value },
                  }}
                >
                  {" "}
                  {column.label}
                  {column.value === orderBy && (
                    <AiOutlineArrowUp className="inline ml-2" />
                  )}
                </NextLink>
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
    </div>
  );
};

export const dynamic = "force-dynamic";

export default IssuePage;
