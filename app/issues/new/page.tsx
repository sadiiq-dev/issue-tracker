"use client";
import { Button, TextArea, TextField } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";

import React from "react";
import { useForm } from "react-hook-form";

interface FormNewIssue {
  title: string;
  description: string;
}

function newIssuePage() {
  const { register, handleSubmit } = useForm<FormNewIssue>();
  const router = useRouter();
  return (
    <form
      className="max-w-xl space-y-3.5"
      onSubmit={handleSubmit(async (data) => {
        await axios.post("/api/issue/create", data);
        router.push("/issues/new");
      })}
    >
      <TextField.Root placeholder="Title" {...register("title")} />
      <TextArea placeholder="Description" {...register("description")} />
      <Button>Create New Issue</Button>
    </form>
  );
}

export default newIssuePage;
