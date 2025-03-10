import { schemaCreateForm } from "@/app/createIsssueSchema";
import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  id: string;
}

export const PUT = async (req: NextRequest, { params }: { params: Params }) => {
  try {
    const body = await req.json();
    const validation = schemaCreateForm.safeParse(body);
    if (!validation.success)
      return NextResponse.json(validation.error.errors, { status: 400 });

    const issue = await prisma.issue.findUnique({
      where: { id: parseInt(params.id) },
    });

    if (!issue)
      return NextResponse.json({ message: "the issue doesn't exist " });

    const updatedIssue = await prisma.issue.update({
      where: { id: parseInt(params.id) },
      data: {
        title: body.title,
        description: body.description,
      },
    });
    return NextResponse.json(updatedIssue, { status: 200 });
  } catch (e) {
    console.log(e);
  }
};
