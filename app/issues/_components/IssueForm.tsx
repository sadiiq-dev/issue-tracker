"use client";
import ErrorMessage from "@/app/components/ErrorMessage";
import { schemaCreateForm } from "@/app/createIsssueSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Callout, TextArea, TextField } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Spinner } from "@/app/components/index";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Issue } from "@prisma/client";

const schemaIssueForm = z.object({
  title: z.string().max(250),
  description: z.string(),
});

interface FormNewIssue {
  title: string;
  description: string;
}

interface Props {
  issue?: Issue;
}

function IssueForm({ issue }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormNewIssue>({
    resolver: zodResolver(schemaCreateForm),
  });
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      if (issue) await axios.put(`/api/issue/update/${issue.id}`, data);
      else await axios.post("/api/issue/create", data);
      router.push("/issues");
    } catch (error) {
      setSubmitting(false);
      setError("an expected error occured.");
    }
  });

  return (
    <div className="max-w-xl space-y-3.5">
      {error && (
        <Callout.Root color="red">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="max-w-xl space-y-3.5" onSubmit={onSubmit}>
        <TextField.Root
          placeholder="Title"
          defaultValue={issue?.title}
          {...register("title")}
        />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <TextArea
          placeholder="Description"
          defaultValue={issue?.description}
          {...register("description")}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button>
          {" "}
          {isSubmitting && <Spinner />}
          {issue ? "Edit Issue" : "Create New Issue"}{" "}
        </Button>
      </form>
    </div>
  );
}

export default IssueForm;
