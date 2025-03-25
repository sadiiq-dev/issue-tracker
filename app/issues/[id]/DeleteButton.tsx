"use client";
import { AlertDialog, Button, Container, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { AiFillDelete } from "react-icons/ai";

const DeleteButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter();
  return (
    <Container>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <div>
            <Button color="red">
              <AiFillDelete />
              Delete The Issue
            </Button>
          </div>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>Confirm To Delete</AlertDialog.Title>
          <AlertDialog.Description>
            Are you sure you want to delete this issue? Make sure this action
            doesn&#39;t have an undo.
          </AlertDialog.Description>
          <Flex mt={"4"} gap={"6"}>
            <AlertDialog.Cancel>
              <Button color="gray" variant="soft">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button
                color="red"
                onClick={async () => {
                  await axios.delete(`/api/issue/delete/` + issueId);
                  router.push("/issues");
                  router.refresh();
                }}
              >
                Delete
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </Container>
  );
};

export default DeleteButton;
