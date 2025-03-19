"use client";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React from "react";

const IssuesFilter = () => {
  const router = useRouter();
  const systemOfOrdering: { label: string; value?: "asc" | "desc" }[] = [
    { label: "None" },
    { label: "Ascending...", value: "asc" },
    { label: "Descending..", value: "desc" },
  ];
  return (
    <Select.Root
      onValueChange={(orderBy) => {
        const query = orderBy === "None" ? "" : `?orderBy=${orderBy}`;
        router.push(`/issues` + query);
      }}
    >
      <Select.Trigger placeholder="Sort by ..." />
      <Select.Content>
        {systemOfOrdering.map((orderBy) => (
          <Select.Item key={orderBy.label} value={orderBy.value || "None"}>
            {orderBy.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssuesFilter;
