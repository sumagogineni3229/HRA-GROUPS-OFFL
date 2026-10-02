import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const inquiries = await prisma.courseInquiry.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, inquiries });
  } catch (error: any) {
    console.error("GET Course Inquiries Error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to fetch course inquiries" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { courseName, fullName, email, phone, message } = body;

    if (!courseName || !fullName || !email || !phone) {
      return NextResponse.json(
        { error: "Course name, candidate name, email, and phone are required." },
        { status: 400 }
      );
    }

    const created = await prisma.courseInquiry.create({
      data: {
        courseName: courseName.trim(),
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        message: message ? message.trim() : null,
        status: "New",
      },
    });

    return NextResponse.json({ success: true, inquiry: created });
  } catch (error: any) {
    console.error("POST Course Inquiry Error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to submit course enrollment" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ error: "ID and Status are required" }, { status: 400 });
    }

    const updated = await prisma.courseInquiry.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json({ success: true, inquiry: updated });
  } catch (error: any) {
    console.error("PATCH Course Inquiry Error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to update inquiry status" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Inquiry ID is required" }, { status: 400 });
    }

    await prisma.courseInquiry.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Course inquiry removed" });
  } catch (error: any) {
    console.error("DELETE Course Inquiry Error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to delete course inquiry" },
      { status: 500 }
    );
  }
}
