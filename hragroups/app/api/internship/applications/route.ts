import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const trackId = searchParams.get("trackId");

    const where: any = {};
    if (trackId) {
      where.internshipTrackId = trackId;
    }

    const applications = await prisma.internshipApplication.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        internshipTrack: {
          select: {
            title: true,
            category: true,
            mode: true,
          },
        },
      },
    });

    return NextResponse.json({ success: true, applications });
  } catch (error: any) {
    console.error("GET Internship Applications Error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to fetch internship applications" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { internshipTrackId, domainTitle, fullName, email, phone, college, message } = body;

    if (!fullName || !email || !phone || !college || !domainTitle) {
      return NextResponse.json(
        { error: "Full name, email, phone, college, and domain are required." },
        { status: 400 }
      );
    }

    const application = await prisma.internshipApplication.create({
      data: {
        internshipTrackId: internshipTrackId || null,
        domainTitle: domainTitle.trim(),
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        college: college.trim(),
        message: message ? message.trim() : null,
        status: "New",
      },
    });

    return NextResponse.json({ success: true, application });
  } catch (error: any) {
    console.error("POST Internship Application Error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to submit internship application" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ error: "Application ID and Status are required" }, { status: 400 });
    }

    const updated = await prisma.internshipApplication.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json({ success: true, application: updated });
  } catch (error: any) {
    console.error("PATCH Internship Application Error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to update application status" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Application ID is required" }, { status: 400 });
    }

    await prisma.internshipApplication.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Internship application removed" });
  } catch (error: any) {
    console.error("DELETE Internship Application Error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to remove application record" },
      { status: 500 }
    );
  }
}
