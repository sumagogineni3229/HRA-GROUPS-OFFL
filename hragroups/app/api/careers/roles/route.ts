import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all career roles
export async function GET() {
  try {
    const roles = await prisma.careerRole.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        applications: true,
      },
    });
    return NextResponse.json({ success: true, roles });
  } catch (error: any) {
    console.error("Fetch career roles error:", error);
    return NextResponse.json({ success: false, roles: [], error: error?.message }, { status: 500 });
  }
}

// POST create a new career opening role
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, dept, location, type, experience, desc, applyLink, tags } = body;

    if (!title || !desc) {
      return NextResponse.json(
        { success: false, error: "Job Title and Description are required." },
        { status: 400 }
      );
    }

    const tagsArray = Array.isArray(tags)
      ? tags
      : typeof tags === "string"
      ? tags.split(",").map((t: string) => t.trim()).filter(Boolean)
      : [];

    const newRole = await prisma.careerRole.create({
      data: {
        title: title.trim(),
        dept: dept || "Engineering",
        location: location || "Hyderabad, India",
        type: type || "Full-Time",
        experience: experience || "1–3 Years",
        desc: desc.trim(),
        applyLink: applyLink ? applyLink.trim() : null,
        tags: tagsArray.length > 0 ? tagsArray : ["Full-Time", "Hyderabad"],
        isActive: true,
      },
    });

    return NextResponse.json({ success: true, role: newRole });
  } catch (error: any) {
    console.error("Create career role error:", error);
    return NextResponse.json({ success: false, error: error?.message || "Failed to create role" }, { status: 500 });
  }
}

// DELETE a career role
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ success: false, error: "Missing ID" }, { status: 400 });
    }

    await prisma.careerRole.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Role deleted successfully" });
  } catch (error: any) {
    console.error("Delete career role error:", error);
    return NextResponse.json({ success: false, error: error?.message || "Failed to delete" }, { status: 500 });
  }
}
