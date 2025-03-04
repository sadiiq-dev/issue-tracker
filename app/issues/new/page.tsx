"use client";
import { Button, Callout, TextArea, TextField } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schemaIssueForm = z.object({
  title: z.string().max(250),
  description: z.string(),
});

interface FormNewIssue {
  title: string;
  description: string;
}

function newIssuePage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormNewIssue>();
  const [error, setError] = useState("");
  const router = useRouter();
  return (
    <div className="max-w-xl space-y-3.5">
      {error && (
        <Callout.Root color="red">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className="max-w-xl space-y-3.5"
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post("/api/issue/create", data);
            router.push("/issues/new");
          } catch (error) {
            setError("an expected error occured.");
          }
        })}
      >
        <TextField.Root placeholder="Title" {...register("title")} />
        <TextArea placeholder="Description" {...register("description")} />
        <Button>Create New Issue</Button>
      </form>
    </div>
  );
}

export default newIssuePage;
