import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

// POST /api/careers/upload - Upload resume files (PDF, DOCX, DOC)
export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("resume") || formData.get("file");

    if (!file || typeof file !== "object" || !("arrayBuffer" in file)) {
      return NextResponse.json(
        { success: false, error: "No resume file provided." },
        { status: 400 }
      );
    }

    const fileObj = file as File;
    const bytes = await fileObj.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadsDir = path.join(process.cwd(), "public", "uploads", "resumes");
    await mkdir(uploadsDir, { recursive: true });

    const originalName = fileObj.name || "candidate-resume.pdf";
    const filename = `${Date.now()}-${originalName.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
    const filePath = path.join(uploadsDir, filename);

    await writeFile(filePath, buffer);
    const resumeUrl = `/uploads/resumes/${filename}`;

    return NextResponse.json({
      success: true,
      resumeUrl,
      fileName: originalName,
    });
  } catch (error: any) {
    console.error("Resume upload error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to upload resume" },
      { status: 500 }
    );
  }
}
