import { Box, Select } from "@radix-ui/themes";
import React from "react";

const SelectAssignee = () => {
  return (
    <Box>
      <Select.Root>
        <Select.Trigger placeholder="Assignee...." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Sugesstions</Select.Label>
            <Select.Item value="sadiiq">Sadiiq Mukhtaatr</Select.Item>
            <Select.Item value="ahmed">Ahmed Isse</Select.Item>
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </Box>
  );
};

export default SelectAssignee;
