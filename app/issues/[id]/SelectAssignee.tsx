"use client";
import { Spinner } from "@/app/components";
import { Issue, User } from "@prisma/client";
import { Box, Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const useUsers = () => {
  return useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axios.get("/api/users");
      return data;
    },
    staleTime: 60 * 1000, // 60sec
    retry: 3,
  });
};
const SelectAssignee = ({ issue }: { issue: Issue }) => {
  const { data: users, error, isLoading } = useUsers();

  if (isLoading) return <Spinner />;

  if (error) return null;

  const assigneIssue = (userId: string) => {
    axios
      .put("/api/issue/update/" + issue.id, {
        assignedToUserId: userId === "unassigned" ? null : userId,
      })
      .catch(() => toast.error("Change could not be saved"));
  };

  return (
    <>
      <Box>
        <Select.Root
          defaultValue={issue.assignedToUserId || "unassigned"}
          onValueChange={assigneIssue}
        >
          <Select.Trigger placeholder="Assignee...." />
          <Select.Content>
            <Select.Group>
              <Select.Label>Suggestions</Select.Label>
              <Select.Item value="unassigned">Unassigned</Select.Item>
              {users?.map((user) => (
                <Select.Item value={user.id} key={user.id}>
                  {user.name}
                </Select.Item>
              ))}
            </Select.Group>
          </Select.Content>
        </Select.Root>
      </Box>
      <Toaster />
    </>
  );
};

export default SelectAssignee;
