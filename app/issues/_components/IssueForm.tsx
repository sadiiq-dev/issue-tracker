"use client";
import ErrorMessage from "@/app/components/ErrorMessage";
import { schemaUpdateIssue } from "@/app/createIsssueSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Callout, TextArea, TextField } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Spinner } from "@/app/components/index";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Issue } from "@prisma/client";

interface FormNewIssue {
  title?: string;
  description?: string;
  assignedToUserId?: string | null;
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
    resolver: zodResolver(schemaUpdateIssue),
    defaultValues: {
      title: issue?.title,
      description: issue?.description,
      assignedToUserId: issue?.assignedToUserId || null,
    },
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
      router.refresh();
    } catch (error) {
      setSubmitting(false);
      setError("An unexpected error occurred." + error);
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
          {isSubmitting && <Spinner />}
          {issue ? "Edit Issue" : "Create New Issue"}
        </Button>
      </form>
    </div>
  );
}

export default IssueForm;
