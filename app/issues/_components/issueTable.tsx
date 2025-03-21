import { IssueStatusBadge } from "@/app/components";
import { Issue } from "@prisma/client";
import { Table, Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";

interface Props {
  searchParams: Promise<{
    status: string;
    orderBy: "asc" | "desc";
    page: string;
  }>;

  issues: Issue[];
}

const IssueTable = async ({ searchParams, issues }: Props) => {
  const { status, orderBy, page } = await searchParams;
  const columns: {
    label: string;
    value: keyof Issue;
    className?: string;
  }[] = [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status", className: "hidden md:table-cell" },
    { label: "created", value: "createdAt", className: "hidden md:table-cell" },
  ];
  return (
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
  );
};

export default IssueTable;
