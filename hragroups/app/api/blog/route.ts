import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

// GET all database blog posts
export async function GET() {
  try {
    const posts = await prisma.blogPost.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, posts });
  } catch (error) {
    console.error("Fetch blogs error:", error);
    return NextResponse.json({ success: false, posts: [] }, { status: 500 });
  }
}

// POST create a new blog post
export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const title = (formData.get("title") as string) || "Untitled Post";
    const excerpt = (formData.get("excerpt") as string) || "";
    const content = (formData.get("content") as string) || "";
    const category = (formData.get("category") as string) || "Blogs";
    const service = (formData.get("service") as string) || "IT Managed Services";
    const industry = (formData.get("industry") as string) || "Government";
    const readTime = (formData.get("readTime") as string) || "5 min read";
    const featured = formData.get("featured") === "true";

    const file = formData.get("file");
    const imageUrlInput = formData.get("imageUrl") as string | null;

    let image = "";

    if (imageUrlInput && typeof imageUrlInput === "string" && imageUrlInput.trim().length > 0) {
      image = imageUrlInput.trim();
    } else if (file && typeof file === "object" && "arrayBuffer" in file && (file as File).size > 0) {
      try {
        const fileObj = file as File;
        const bytes = await fileObj.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const uploadsDir = path.join(process.cwd(), "public", "uploads", "blog");
        await mkdir(uploadsDir, { recursive: true });

        const originalName = fileObj.name || "cover.jpg";
        const filename = `${Date.now()}-${originalName.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
        const filePath = path.join(uploadsDir, filename);

        await writeFile(filePath, buffer);
        image = `/uploads/blog/${filename}`;
      } catch (fileErr) {
        console.error("File upload error, fallback to default image:", fileErr);
        image = "https://cdn.prod.website-files.com/685c045f09a3dab41aa0d72a/6ab591ebae44c3fb86fd1ba7_5%20Steps%20to%20Prepare%20for%20Cybersecurity%20Awareness%20Month.webp";
      }
    } else {
      image = "https://cdn.prod.website-files.com/685c045f09a3dab41aa0d72a/6ab591ebae44c3fb86fd1ba7_5%20Steps%20to%20Prepare%20for%20Cybersecurity%20Awareness%20Month.webp";
    }

    const newPost = await prisma.blogPost.create({
      data: {
        title,
        excerpt,
        content,
        category,
        service,
        industry,
        readTime,
        image,
        featured,
      },
    });

    return NextResponse.json({ success: true, post: newPost });
  } catch (error: any) {
    console.error("Create blog post error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to publish blog post" },
      { status: 500 }
    );
  }
}

// PUT update an existing blog post
export async function PUT(req: Request) {
  try {
    const formData = await req.formData();
    const id = formData.get("id") as string;

    if (!id) {
      return NextResponse.json({ success: false, error: "Missing ID" }, { status: 400 });
    }

    const title = (formData.get("title") as string) || "Untitled Post";
    const excerpt = (formData.get("excerpt") as string) || "";
    const content = (formData.get("content") as string) || "";
    const category = (formData.get("category") as string) || "Blogs";
    const service = (formData.get("service") as string) || "IT Managed Services";
    const industry = (formData.get("industry") as string) || "Government";
    const readTime = (formData.get("readTime") as string) || "5 min read";
    const featured = formData.get("featured") === "true";

    const file = formData.get("file");
    const imageUrlInput = formData.get("imageUrl") as string | null;

    const updateData: any = {
      title,
      excerpt,
      content,
      category,
      service,
      industry,
      readTime,
      featured,
    };

    if (imageUrlInput && typeof imageUrlInput === "string" && imageUrlInput.trim().length > 0) {
      updateData.image = imageUrlInput.trim();
    } else if (file && typeof file === "object" && "arrayBuffer" in file && (file as File).size > 0) {
      try {
        const fileObj = file as File;
        const bytes = await fileObj.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const uploadsDir = path.join(process.cwd(), "public", "uploads", "blog");
        await mkdir(uploadsDir, { recursive: true });

        const originalName = fileObj.name || "cover.jpg";
        const filename = `${Date.now()}-${originalName.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
        const filePath = path.join(uploadsDir, filename);

        await writeFile(filePath, buffer);
        updateData.image = `/uploads/blog/${filename}`;
      } catch (fileErr) {
        console.error("File upload error during update:", fileErr);
      }
    }

    const updated = await prisma.blogPost.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ success: true, post: updated });
  } catch (error: any) {
    console.error("Update blog post error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to update blog post" },
      { status: 500 }
    );
  }
}

// DELETE a blog post
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ success: false, error: "Missing ID" }, { status: 400 });
    }

    await prisma.blogPost.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Blog post deleted successfully" });
  } catch (error) {
    console.error("Delete blog error:", error);
    return NextResponse.json({ success: false, error: "Failed to delete" }, { status: 500 });
  }
}
