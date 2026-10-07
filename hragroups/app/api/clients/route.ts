import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { PrismaClient } from "@prisma/client";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

function getClientDb() {
  if (prisma && (prisma as any).client) {
    return prisma;
  }
  return new PrismaClient();
}

// GET all dynamic clients from database
export async function GET() {
  try {
    const db = getClientDb();
    const clients = await db.client.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, clients });
  } catch (error: any) {
    console.error("Fetch clients error:", error);
    return NextResponse.json({ success: false, clients: [] }, { status: 500 });
  }
}

// POST create / upload new client
export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const name = (formData.get("name") as string) || "";
    const category = (formData.get("category") as string) || "Enterprise Solutions";
    const description = (formData.get("description") as string) || "";
    const website = (formData.get("website") as string) || "";

    if (!name.trim()) {
      return NextResponse.json(
        { success: false, error: "Client name is required." },
        { status: 400 }
      );
    }

    const file = formData.get("file");
    const logoUrlInput = formData.get("logoUrl") as string | null;

    let logo = "";

    if (logoUrlInput && typeof logoUrlInput === "string" && logoUrlInput.trim().length > 0) {
      logo = logoUrlInput.trim();
    } else if (file && typeof file === "object" && "arrayBuffer" in file && (file as File).size > 0) {
      try {
        const fileObj = file as File;
        const bytes = await fileObj.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const uploadsDir = path.join(process.cwd(), "public", "uploads", "clients");
        await mkdir(uploadsDir, { recursive: true });

        const originalName = fileObj.name || "client-logo.png";
        const filename = `${Date.now()}-${originalName.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
        const filePath = path.join(uploadsDir, filename);

        await writeFile(filePath, buffer);
        logo = `/uploads/clients/${filename}`;
      } catch (fileErr) {
        console.error("File upload error:", fileErr);
        logo = "https://assets.zyrosite.com/Y4LvROeE7gfaLJG1/abhitsolutions-YX4xMrgxxVulNQ5z.jpg";
      }
    } else {
      logo = "https://assets.zyrosite.com/Y4LvROeE7gfaLJG1/abhitsolutions-YX4xMrgxxVulNQ5z.jpg";
    }

    const db = getClientDb();
    const newClient = await db.client.create({
      data: {
        name: name.trim(),
        logo,
        category: category.trim(),
        description: description.trim() || null,
        website: website.trim() || null,
      },
    });

    return NextResponse.json({ success: true, client: newClient });
  } catch (error: any) {
    console.error("Create client error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to create client" },
      { status: 500 }
    );
  }
}

// DELETE a client
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ success: false, error: "Missing ID" }, { status: 400 });
    }

    const db = getClientDb();
    await db.client.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Client deleted successfully" });
  } catch (error: any) {
    console.error("Delete client error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to delete client" },
      { status: 500 }
    );
  }
}
