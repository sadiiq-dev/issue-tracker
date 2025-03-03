import { Button, TextArea, TextField } from "@radix-ui/themes";
import React from "react";
const newIssuePage = () => (
  <div className="max-w-xl space-y-3.5">
    <TextField.Root placeholder="Title"></TextField.Root>
    <TextArea placeholder="Description" />
    <Button>Create New Issue</Button>
  </div>
);

export default newIssuePage;
