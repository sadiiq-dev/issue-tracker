"use client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const IssuesSort = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const systemOfOrdering: { label: string; value?: "asc" | "desc" }[] = [
    { label: "None" },
    { label: "Ascending...", value: "asc" },
    { label: "Descending..", value: "desc" },
  ];
  return (
    <Select.Root
      defaultValue={searchParams.get("orderBy") || "None"}
      onValueChange={(orderBy) => {
        const params = new URLSearchParams();
        if (orderBy) params.append("orderBy", orderBy);
        if (searchParams.get("status"))
          params.append("status", searchParams.get("status")!);
        const query = params.size ? `?${params}` : "";
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

export default IssuesSort;
