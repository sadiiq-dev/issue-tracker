"use client";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import React from "react";
import { AiFillDelete } from "react-icons/ai";

const DeleteButton = ({ issueId }: { issueId: Number }) => {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <div>
          <Button color="red">
            <AiFillDelete />
            Edit The Issue
          </Button>
        </div>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Confirm To Delete</AlertDialog.Title>
        <AlertDialog.Description>
          Are you sure you want to delete this issue ? make sure this action
          don't have undo{" "}
        </AlertDialog.Description>
        <Flex mt={"4"} gap={"6"}>
          <AlertDialog.Cancel>
            <Button color="gray" variant="soft">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button color="red">Delete </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default DeleteButton;
