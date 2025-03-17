import authOptions from "@/app/auth/authOptions";
import { schemaUpdateIssue } from "@/app/createIsssueSchema";
import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  id: string;
}

export const PUT = async (req: NextRequest, { params }: { params: Params }) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({}, { status: 401 });

    const body = await req.json();
    const validation = schemaUpdateIssue.safeParse(body);
    if (!validation.success)
      return NextResponse.json(validation.error.errors, { status: 400 });

    const issue = await prisma.issue.findUnique({
      where: { id: parseInt(params.id) },
    });

    if (!issue)
      return NextResponse.json(
        { message: "the issue doesn't exist " },
        { status: 400 }
      );

    const { assignedToUserId, title, description } = body;

    if (assignedToUserId) {
      const user = await prisma.user.findUnique({
        where: { id: assignedToUserId },
      });

      if (!user)
        return NextResponse.json({ message: "invalid user" }, { status: 400 });
    }

    const updatedIssue = await prisma.issue.update({
      where: { id: parseInt(params.id) },
      data: {
        title,
        description,
        assignedToUserId,
      },
    });
    return NextResponse.json(updatedIssue, { status: 200 });
  } catch (e) {
    console.log(e);
  }
};
