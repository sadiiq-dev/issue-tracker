import { Badge } from "@radix-ui/themes";
import React from "react";

const IssueStatusBadge = ({ status }: { status: string }) => {
  if (status === "OPEN") return <Badge color="red">{status}</Badge>;
  if (status === "IN_PROGRESS") return <Badge color="violet">{status}</Badge>;
  if (status === "CLOSED") return <Badge color="green">{status}</Badge>;
};

export default IssueStatusBadge;
