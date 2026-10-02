import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const assessmentId = searchParams.get("assessmentId");

    const where: any = {};
    if (assessmentId) {
      where.assessmentId = assessmentId;
    }

    const submissions = await prisma.examSubmission.findMany({
      where,
      orderBy: { submittedAt: "desc" },
      include: {
        assessment: {
          select: {
            title: true,
            examKey: true,
            passScorePct: true,
            category: true,
          },
        },
      },
    });

    return NextResponse.json({ success: true, submissions });
  } catch (error: any) {
    console.error("GET Submissions Error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to fetch submissions" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      assessmentId,
      candidateId,
      candidateName,
      candidateEmail,
      answers, // Record<string, number>
      timeSpentSecs,
    } = body;

    if (!assessmentId || !candidateId || !candidateName || !answers) {
      return NextResponse.json(
        { error: "Assessment ID, Candidate ID, Name, and Answers are required." },
        { status: 400 }
      );
    }

    // Fetch assessment to auto-grade
    const assessment = await prisma.assessment.findUnique({
      where: { id: assessmentId },
    });

    if (!assessment) {
      return NextResponse.json({ error: "Assessment not found" }, { status: 404 });
    }

    const questions = assessment.questions as any[];
    let earnedPoints = 0;
    let totalPoints = 0;

    questions.forEach((q) => {
      const qPoints = Number(q.points) || 1;
      totalPoints += qPoints;

      const candidateAnswer = answers[q.id];
      if (
        candidateAnswer !== undefined &&
        Number(candidateAnswer) === Number(q.correctOptionIndex)
      ) {
        earnedPoints += qPoints;
      }
    });

    const percentage =
      totalPoints > 0 ? Number(((earnedPoints / totalPoints) * 100).toFixed(1)) : 0;
    const status = percentage >= assessment.passScorePct ? "PASSED" : "FAILED";

    const submission = await prisma.examSubmission.create({
      data: {
        assessmentId,
        candidateId: candidateId.trim(),
        candidateName: candidateName.trim(),
        candidateEmail: candidateEmail?.trim() || null,
        answers,
        score: earnedPoints,
        totalPoints,
        percentage,
        status,
        timeSpentSecs: Number(timeSpentSecs) || null,
      },
    });

    return NextResponse.json({
      success: true,
      submission: {
        id: submission.id,
        candidateId: submission.candidateId,
        candidateName: submission.candidateName,
        score: earnedPoints,
        totalPoints,
        percentage,
        status,
        passScorePct: assessment.passScorePct,
        submittedAt: submission.submittedAt,
      },
    });
  } catch (error: any) {
    console.error("POST Submission Error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to submit exam assessment" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Submission ID is required" }, { status: 400 });
    }

    await prisma.examSubmission.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Submission record removed" });
  } catch (error: any) {
    console.error("DELETE Submission Error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to remove submission record" },
      { status: 500 }
    );
  }
}
