"use client";
import { Card } from "@radix-ui/themes";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis } from "recharts";
import React from "react";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueChart = ({ closed, inProgress, open }: Props) => {
  const data = [
    { label: "Open issues", value: open },
    { label: "In-progress issues", value: inProgress },
    { label: "Closed issues", value: closed },
  ];
  return (
    <Card>
      <ResponsiveContainer width={"100%"} height={300}>
        <BarChart barSize={100} data={data}>
          <Bar dataKey="value" style={{ fill: "var(--accent-9)" }} />
          <XAxis dataKey={"label"} />
          <YAxis />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default IssueChart;
