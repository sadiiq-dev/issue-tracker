import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { AiFillDelete } from "react-icons/ai";

const DeleteButton = ({ issueId }: { issueId: Number }) => {
  return (
    <div>
      <Button color="red">
        <AiFillDelete />
        Edit The Issue
      </Button>
    </div>
  );
};

export default DeleteButton;
