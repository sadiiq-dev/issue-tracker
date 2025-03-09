import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button, Link } from "@radix-ui/themes";
import React from "react";

const EditButton = ({ issueId }: { issueId: number }) => {
  return (
    <Link href={`/issues/${issueId}/edit`}>
      <Button className="cursor-pointer">
        <Pencil2Icon />
        Edit The Issue
      </Button>
    </Link>
  );
};

export default EditButton;
