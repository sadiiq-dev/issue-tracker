"use client";
import { User } from "@prisma/client";
import { Box, Select } from "@radix-ui/themes";
import axios from "axios";
import React, { useEffect, useState } from "react";

const SelectAssignee = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await axios.get("/api/users");
      setUsers(data);
    };

    fetchUsers();
  }, []);

  return (
    <Box>
      <Select.Root>
        <Select.Trigger placeholder="Assignee...." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Sugesstions</Select.Label>
            {users.map((user) => (
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
