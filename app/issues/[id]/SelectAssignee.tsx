"use client";
import { Spinner } from "@/app/components";
import { Issue, User } from "@prisma/client";
import { Box, Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";

const SelectAssignee = ({ issue }: { issue: Issue }) => {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axios.get("/api/users");
      return data;
    },
    staleTime: 60 * 1000, // 60sec
    retry: 3,
  });

  if (isLoading) return <Spinner />;

  if (error) return null;

  return (
    <Box>
      <Select.Root
        defaultValue={issue.assignedToUserId}
        onValueChange={(userId) => {
          axios.put("/api/issue/update/" + issue.id, {
            assignedToUserId: userId,
          });
        }}
      >
        <Select.Trigger placeholder="Assignee...." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Sugesstions</Select.Label>
            <Select.Item value={null}>UnAssigned</Select.Item>
            {users?.map((user) => (
              <Select.Item value={user.id} key={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </Box>
  );
};

export default SelectAssignee;
