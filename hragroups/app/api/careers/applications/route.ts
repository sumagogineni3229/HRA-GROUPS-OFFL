import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all applications for admin
export async function GET() {
  try {
    const applications = await prisma.careerApplication.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        careerRole: true,
      },
    });
    return NextResponse.json({ success: true, applications });
  } catch (error: any) {
    console.error("Fetch applications error:", error);
    return NextResponse.json({ success: false, applications: [], error: error?.message }, { status: 500 });
  }
}

// POST submit a new candidate application
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      careerRoleId,
      roleTitle,
      fullName,
      email,
      phone,
      location,
      experience,
      expectedCtc,
      noticePeriod,
      skills,
      resumeUrl,
      coverLetter,
    } = body;

    if (!fullName || !email || !phone || !roleTitle) {
      return NextResponse.json(
        { success: false, error: "Full Name, Email, Phone, and Position are required." },
        { status: 400 }
      );
    }

    const application = await prisma.careerApplication.create({
      data: {
        careerRoleId: careerRoleId || null,
        roleTitle: roleTitle.trim(),
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        location: location ? location.trim() : null,
        experience: experience ? experience.trim() : null,
        expectedCtc: expectedCtc ? expectedCtc.trim() : null,
        noticePeriod: noticePeriod ? noticePeriod.trim() : null,
        skills: skills ? skills.trim() : null,
        resumeUrl: resumeUrl ? resumeUrl.trim() : null,
        coverLetter: coverLetter ? coverLetter.trim() : null,
        status: "New",
      },
    });

    return NextResponse.json({ success: true, application });
  } catch (error: any) {
    console.error("Submit application error:", error);
    return NextResponse.json({ success: false, error: error?.message || "Failed to submit application" }, { status: 500 });
  }
}

// DELETE or UPDATE status
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ success: false, error: "Missing ID" }, { status: 400 });
    }

    await prisma.careerApplication.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Application deleted successfully" });
  } catch (error: any) {
    console.error("Delete application error:", error);
    return NextResponse.json({ success: false, error: error?.message || "Failed to delete" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { id, status } = await req.json();
    if (!id || !status) {
      return NextResponse.json({ success: false, error: "Missing ID or status" }, { status: 400 });
    }

    const updated = await prisma.careerApplication.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json({ success: true, application: updated });
  } catch (error: any) {
    console.error("Update application status error:", error);
    return NextResponse.json({ success: false, error: error?.message || "Failed to update" }, { status: 500 });
  }
}
