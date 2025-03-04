"use client";
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
            router.push("/issues/new");
          } catch (error) {
            setError("an expected error occured.");
          }
        })}
      >
        <TextField.Root placeholder="Title" {...register("title")} />
        <div className="mt-[-12px] mb-[12px]">
          {errors.title && (
            <Text color="red" as="p">
              {errors.title?.message}
            </Text>
          )}
        </div>
        <TextArea placeholder="Description" {...register("description")} />
        {errors.description && (
          <Text color="red">{errors.description?.message}</Text>
        )}
        <Button>Create New Issue</Button>
      </form>
    </div>
  );
}

export default newIssuePage;
