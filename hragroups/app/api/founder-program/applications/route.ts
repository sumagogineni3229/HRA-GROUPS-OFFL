import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const applications = await prisma.founderApplication.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, applications });
  } catch (error: any) {
    console.error("GET Founder Applications Error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to fetch founder applications" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      fullName,
      email,
      phone,
      location,
      designation,
      company,
      industry,
      website,
      business,
      goals,
      interests,
    } = body;

    if (!fullName || !email || !phone || !business) {
      return NextResponse.json(
        { error: "Full Name, Email, Phone Number, and Business description are required." },
        { status: 400 }
      );
    }

    const application = await prisma.founderApplication.create({
      data: {
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        location: location ? location.trim() : null,
        designation: designation ? designation.trim() : null,
        company: company ? company.trim() : null,
        industry: industry ? industry.trim() : null,
        website: website ? website.trim() : null,
        business: business.trim(),
        goals: goals ? goals.trim() : null,
        interests: Array.isArray(interests) ? interests : [],
        status: "New",
      },
    });

    return NextResponse.json({ success: true, application });
  } catch (error: any) {
    console.error("POST Founder Application Error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to submit founder application" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { error: "Application ID and Status are required" },
        { status: 400 }
      );
    }

    const updated = await prisma.founderApplication.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json({ success: true, application: updated });
  } catch (error: any) {
    console.error("PATCH Founder Application Error:", error);
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
      return NextResponse.json(
        { error: "Application ID is required" },
        { status: 400 }
      );
    }

    await prisma.founderApplication.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Application deleted successfully" });
  } catch (error: any) {
    console.error("DELETE Founder Application Error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to delete application" },
      { status: 500 }
    );
  }
}
