import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

// GET all gallery items from database
export async function GET() {
  try {
    const items = await prisma.galleryItem.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, items });
  } catch (error) {
    console.error("Fetch gallery error:", error);
    return NextResponse.json({ success: false, items: [] }, { status: 500 });
  }
}

// POST upload/add new gallery item
export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const title = (formData.get("title") as string) || "Gallery Moment";
    const desc = (formData.get("desc") as string) || "";
    const category = (formData.get("category") as string) || "Awards & Recognition";
    const tag = (formData.get("tag") as string) || "";

    const file = formData.get("file");
    const imageUrlInput = formData.get("imageUrl") as string | null;

    let src = "";

    if (imageUrlInput && typeof imageUrlInput === "string" && imageUrlInput.trim().length > 0) {
      src = imageUrlInput.trim();
    } else if (file && typeof file === "object" && "arrayBuffer" in file && (file as File).size > 0) {
      try {
        const fileObj = file as File;
        const bytes = await fileObj.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const uploadsDir = path.join(process.cwd(), "public", "uploads", "gallery");
        await mkdir(uploadsDir, { recursive: true });

        const originalName = fileObj.name || "gallery.jpg";
        const filename = `${Date.now()}-${originalName.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
        const filePath = path.join(uploadsDir, filename);

        await writeFile(filePath, buffer);
        src = `/uploads/gallery/${filename}`;
      } catch (fileErr) {
        console.error("File upload error, fallback image:", fileErr);
        src = "https://assets.zyrosite.com/Y4LvROeE7gfaLJG1/ceo-A0xjR7b7QVtvl5W2.jpg";
      }
    } else {
      src = "https://assets.zyrosite.com/Y4LvROeE7gfaLJG1/ceo-A0xjR7b7QVtvl5W2.jpg";
    }

    const newItem = await prisma.galleryItem.create({
      data: {
        title,
        desc,
        src,
        category,
        tag,
      },
    });

    return NextResponse.json({ success: true, item: newItem });
  } catch (error: any) {
    console.error("Create gallery item error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to add gallery media" },
      { status: 500 }
    );
  }
}

// DELETE a gallery item
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ success: false, error: "Missing ID" }, { status: 400 });
    }

    await prisma.galleryItem.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Gallery item deleted successfully" });
  } catch (error) {
    console.error("Delete gallery error:", error);
    return NextResponse.json({ success: false, error: "Failed to delete" }, { status: 500 });
  }
}
