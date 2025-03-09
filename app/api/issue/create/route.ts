import { schemaCreateForm } from "@/app/createIsssueSchema";
import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface Body {
  title: string;
  description: string;
}

export async function POST(req: NextRequest) {
  const body: Body = await req.json();
  const validation = schemaCreateForm.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(newIssue, { status: 201 });
}
