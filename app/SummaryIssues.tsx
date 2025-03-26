import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const SummaryIssues = ({ open, closed, inProgress }: Props) => {
  const containers: { label: string; value: number; status: string }[] = [
    { label: "Open issues", value: open, status: "OPEN" },
    { label: "In-progress issues", value: inProgress, status: "IN_PROGRESS" },
    { label: "Closed issues", value: closed, status: "CLOSED" },
  ];
  return (
    <Flex gap={"5"}>
      {containers.map((container) => (
        <Card key={container.label}>
          <Flex direction={"column"} gap={"2"}>
            <Link
              href={`issues/?status=${container.status}`}
              className="text-sm font-medium"
            >
              {container.label}
            </Link>
            <Text className="font-bold">{container.value}</Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default SummaryIssues;
