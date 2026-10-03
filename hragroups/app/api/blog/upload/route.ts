import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

// POST /api/blog/upload - dedicated for image assets upload ONLY (does not create blog posts)
export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || typeof file !== "object" || !("arrayBuffer" in file)) {
      return NextResponse.json(
        { success: false, error: "No image file provided" },
        { status: 400 }
      );
    }

    const fileObj = file as File;
    const bytes = await fileObj.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadsDir = path.join(process.cwd(), "public", "uploads", "blog");
    await mkdir(uploadsDir, { recursive: true });

    const originalName = fileObj.name || "inline-image.jpg";
    const filename = `${Date.now()}-${originalName.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
    const filePath = path.join(uploadsDir, filename);

    await writeFile(filePath, buffer);
    const imageUrl = `/uploads/blog/${filename}`;

    return NextResponse.json({ success: true, url: imageUrl });
  } catch (error: any) {
    console.error("Inline image upload error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to upload image" },
      { status: 500 }
    );
  }
}
