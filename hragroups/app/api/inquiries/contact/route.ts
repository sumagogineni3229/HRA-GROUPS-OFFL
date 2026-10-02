import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const inquiries = await prisma.contactInquiry.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, inquiries });
  } catch (error: any) {
    console.error("GET Contact Inquiries Error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to fetch inquiries" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, message } = body;

    if (!firstName || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const created = await prisma.contactInquiry.create({
      data: {
        firstName: firstName.trim(),
        lastName: lastName ? lastName.trim() : null,
        email: email.trim(),
        message: message.trim(),
        status: "New",
      },
    });

    return NextResponse.json({ success: true, inquiry: created });
  } catch (error: any) {
    console.error("POST Contact Inquiry Error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to submit message" },
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

    const updated = await prisma.contactInquiry.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json({ success: true, inquiry: updated });
  } catch (error: any) {
    console.error("PATCH Contact Inquiry Error:", error);
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

    await prisma.contactInquiry.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Inquiry deleted" });
  } catch (error: any) {
    console.error("DELETE Contact Inquiry Error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to delete inquiry" },
      { status: 500 }
    );
  }
}
