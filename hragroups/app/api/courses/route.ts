import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

// GET all database courses
export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, courses });
  } catch (error: any) {
    console.error("Fetch courses error:", error);
    return NextResponse.json({ success: false, courses: [], error: error?.message }, { status: 500 });
  }
}

// POST create a new course
export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const title = (formData.get("title") as string) || "Untitled Course";
    const badge = (formData.get("badge") as string) || "Specialization";
    const description = (formData.get("description") as string) || "";
    const duration = (formData.get("duration") as string) || "4 Months";
    const level = (formData.get("level") as string) || "Intermediate";
    const color = (formData.get("color") as string) || "from-blue-600 to-indigo-700";

    const syllabusRaw = (formData.get("syllabus") as string) || "";
    const syllabus = syllabusRaw
      .split("\n")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    // Handle images (URLs or uploaded files)
    const images: string[] = [];
    const imageUrlsRaw = (formData.get("imageUrls") as string) || "";
    if (imageUrlsRaw.trim()) {
      imageUrlsRaw.split("\n").forEach((url) => {
        const trimmed = url.trim();
        if (trimmed) images.push(trimmed);
      });
    }

    const files = formData.getAll("files");
    if (files && files.length > 0) {
      const uploadsDir = path.join(process.cwd(), "public", "uploads", "courses");
      await mkdir(uploadsDir, { recursive: true });

      for (const file of files) {
        if (file && typeof file === "object" && "arrayBuffer" in file && (file as File).size > 0) {
          try {
            const fileObj = file as File;
            const bytes = await fileObj.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const originalName = fileObj.name || "course-image.jpg";
            const filename = `${Date.now()}-${Math.random().toString(36).substring(7)}-${originalName.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
            const filePath = path.join(uploadsDir, filename);
            await writeFile(filePath, buffer);
            images.push(`/uploads/courses/${filename}`);
          } catch (e) {
            console.error("Error writing uploaded course image:", e);
          }
        }
      }
    }

    if (images.length === 0) {
      images.push("https://assets.zyrosite.com/Y4LvROeE7gfaLJG1/aiml001-3KI9bBOEO3ocT4KR.jpg");
    }

    const course = await prisma.course.create({
      data: {
        title,
        badge,
        description,
        duration,
        level,
        color,
        syllabus: syllabus.length > 0 ? syllabus : ["Comprehensive core foundation", "Real-world production projects", "Placement assistance"],
        images,
      },
    });

    return NextResponse.json({ success: true, course });
  } catch (error: any) {
    console.error("Create course error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to create course" },
      { status: 500 }
    );
  }
}

// DELETE a course
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ success: false, error: "Missing ID" }, { status: 400 });
    }

    await prisma.course.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Course deleted successfully" });
  } catch (error: any) {
    console.error("Delete course error:", error);
    return NextResponse.json({ success: false, error: error?.message || "Failed to delete" }, { status: 500 });
  }
}
