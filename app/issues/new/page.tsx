"use client";
import ErrorMessage from "@/app/components/ErrorMessage";
import { createIsssueSchema } from "@/app/createIsssueSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Callout, Text, TextArea, TextField } from "@radix-ui/themes";
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
  } = useForm<FormNewIssue>({
    resolver: zodResolver(createIsssueSchema),
  });
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
            router.push("/issues");
          } catch (error) {
            setError("an expected error occured.");
          }
        })}
      >
        <TextField.Root placeholder="Title" {...register("title")} />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <TextArea placeholder="Description" {...register("description")} />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button>Create New Issue</Button>
      </form>
    </div>
  );
}

export default newIssuePage;
