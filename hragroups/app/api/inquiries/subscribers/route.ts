import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const subscribers = await prisma.subscriber.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, subscribers });
  } catch (error: any) {
    console.error("GET Subscribers Error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to fetch subscribers" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, source } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 }
      );
    }

    const trimmedEmail = email.trim().toLowerCase();

    // Check if already subscribed
    const existing = await prisma.subscriber.findUnique({
      where: { email: trimmedEmail },
    });

    if (existing) {
      if (existing.status === "Unsubscribed") {
        const updated = await prisma.subscriber.update({
          where: { id: existing.id },
          data: { status: "Active" },
        });
        return NextResponse.json({
          success: true,
          subscriber: updated,
          message: "Subscription reactivated!",
        });
      }
      return NextResponse.json({
        success: true,
        subscriber: existing,
        message: "Already subscribed to newsletter!",
      });
    }

    const created = await prisma.subscriber.create({
      data: {
        email: trimmedEmail,
        source: source || "Blog Page Newsletter",
        status: "Active",
      },
    });

    return NextResponse.json({
      success: true,
      subscriber: created,
      message: "Successfully subscribed to HRA newsletter!",
    });
  } catch (error: any) {
    console.error("POST Subscriber Error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to subscribe" },
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

    const updated = await prisma.subscriber.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json({ success: true, subscriber: updated });
  } catch (error: any) {
    console.error("PATCH Subscriber Error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to update subscriber status" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Subscriber ID is required" }, { status: 400 });
    }

    await prisma.subscriber.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Subscriber deleted" });
  } catch (error: any) {
    console.error("DELETE Subscriber Error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to delete subscriber" },
      { status: 500 }
    );
  }
}
