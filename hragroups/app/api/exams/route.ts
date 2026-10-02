import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const key = searchParams.get("key");

    if (key) {
      // Find specific exam by key for candidate login/taking
      const exam = await prisma.assessment.findUnique({
        where: { examKey: key.trim() },
        include: {
          submissions: {
            select: {
              id: true,
              candidateId: true,
              candidateName: true,
              percentage: true,
              status: true,
              submittedAt: true,
            },
          },
        },
      });

      if (!exam) {
        return NextResponse.json(
          { error: "Invalid session passcode or exam key. Please verify with proctor." },
          { status: 404 }
        );
      }

      if (!exam.isActive) {
        return NextResponse.json(
          { error: "This examination session has ended or is currently disabled." },
          { status: 403 }
        );
      }

      return NextResponse.json({ success: true, exam });
    }

    // Default: fetch all assessments (for admin overview)
    const assessments = await prisma.assessment.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: { submissions: true },
        },
      },
    });

    return NextResponse.json({ success: true, assessments });
  } catch (error: any) {
    console.error("GET Assessment Error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to fetch assessments" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      title,
      category,
      courseCohort,
      examKey,
      durationMins,
      passScorePct,
      description,
      questions,
      isActive,
    } = body;

    if (!title || !examKey || !questions || !Array.isArray(questions) || questions.length === 0) {
      return NextResponse.json(
        { error: "Exam title, unique access key, and at least 1 question are required." },
        { status: 400 }
      );
    }

    // Check unique exam key
    const existing = await prisma.assessment.findUnique({
      where: { examKey: examKey.trim() },
    });

    if (existing) {
      return NextResponse.json(
        { error: `An exam with key "${examKey}" already exists. Please choose a different key.` },
        { status: 400 }
      );
    }

    const created = await prisma.assessment.create({
      data: {
        title: title.trim(),
        category: category || "Technical Assessment",
        courseCohort: courseCohort || "General Cohort",
        examKey: examKey.trim().toUpperCase(),
        durationMins: Number(durationMins) || 45,
        passScorePct: Number(passScorePct) || 70,
        description: description || null,
        questions: questions,
        isActive: isActive !== false,
      },
    });

    return NextResponse.json({ success: true, assessment: created });
  } catch (error: any) {
    console.error("POST Assessment Error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to create assessment" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Assessment ID is required" }, { status: 400 });
    }

    await prisma.assessment.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Assessment deleted successfully" });
  } catch (error: any) {
    console.error("DELETE Assessment Error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to delete assessment" },
      { status: 500 }
    );
  }
}
