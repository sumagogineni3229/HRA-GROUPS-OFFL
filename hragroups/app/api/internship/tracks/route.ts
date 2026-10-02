import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const tracks = await prisma.internshipTrack.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: { applications: true },
        },
      },
    });

    return NextResponse.json({ success: true, tracks });
  } catch (error: any) {
    console.error("GET Internship Tracks Error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to fetch internship tracks" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, category, description, duration, mode, tags, isActive } = body;

    if (!title || !description) {
      return NextResponse.json(
        { error: "Track title and description are required." },
        { status: 400 }
      );
    }

    const created = await prisma.internshipTrack.create({
      data: {
        title: title.trim(),
        category: category || "technology",
        description: description.trim(),
        duration: duration || "3–6 Months",
        mode: mode || "Hybrid / Remote",
        tags: Array.isArray(tags) ? tags : [],
        isActive: isActive !== false,
      },
    });

    return NextResponse.json({ success: true, track: created });
  } catch (error: any) {
    console.error("POST Internship Track Error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to create internship track" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Internship Track ID is required" }, { status: 400 });
    }

    await prisma.internshipTrack.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Internship track deleted successfully" });
  } catch (error: any) {
    console.error("DELETE Internship Track Error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to delete internship track" },
      { status: 500 }
    );
  }
}
