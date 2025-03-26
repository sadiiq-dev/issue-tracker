"use client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const IssuesStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const statuses: { label: string; value?: string }[] = [
    { label: "All" },
    { label: "Open", value: "OPEN" },
    { label: "In-progress", value: "IN_PROGRESS" },
    { label: "Closed", value: "CLOSED" },
  ];
  return (
    <Select.Root
      defaultValue={searchParams.get("status") || "all"}
      onValueChange={(status) => {
        const params = new URLSearchParams();
        if (status) params.append("status", status);
        if (searchParams.get("orderBy"))
          params.append("orderBy", searchParams.get("orderBy")!);
        console.log(params.entries());
        const query = params.size ? `?${params.toString()}` : "";
        router.push(`/issues` + query);
      }}
    >
      <Select.Trigger placeholder="Filter by status ..." />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item key={status.label} value={status.value || "all"}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssuesStatusFilter;
