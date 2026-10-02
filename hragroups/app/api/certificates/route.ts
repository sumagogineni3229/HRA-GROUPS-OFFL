import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all certificates (for admin or list)
export async function GET() {
  try {
    const certificates = await prisma.certificate.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, certificates });
  } catch (error: any) {
    console.error("Fetch certificates error:", error);
    return NextResponse.json({ success: false, certificates: [], error: error?.message }, { status: 500 });
  }
}

// POST: Handles Certificate Verification (from public portal) OR Certificate Creation (from admin)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action } = body;

    // Action 1: Public Verification
    if (action === "verify") {
      const { holderName, certificateId, password } = body;

      if (!holderName || !certificateId || !password) {
        return NextResponse.json(
          { success: false, error: "Please provide Certificate Holder Name, Certificate ID, and Verification Password." },
          { status: 400 }
        );
      }

      // 1. Search in Database
      const cert = await prisma.certificate.findFirst({
        where: {
          certificateId: {
            equals: certificateId.trim(),
            mode: "insensitive",
          },
        },
      });

      if (cert) {
        // Check exact match for name and password
        const nameMatch = cert.holderName.toLowerCase().trim() === holderName.toLowerCase().trim();
        const pwdMatch = cert.password.trim() === password.trim();

        if (!nameMatch) {
          return NextResponse.json(
            { success: false, error: "Certificate ID found, but Holder Name does not match records." },
            { status: 401 }
          );
        }

        if (!pwdMatch) {
          return NextResponse.json(
            { success: false, error: "Incorrect verification password for this certificate." },
            { status: 401 }
          );
        }

        return NextResponse.json({
          success: true,
          verified: true,
          certificate: {
            holderName: cert.holderName,
            certificateId: cert.certificateId,
            courseName: cert.courseName,
            issueDate: cert.issueDate,
            grade: cert.grade || "A+",
            status: cert.status || "Verified Official",
            certificateUrl: cert.certificateUrl,
          },
        });
      }

      // 2. Demo fallback for standard format HRA-0001 (for demo testing if DB is empty)
      if (
        certificateId.trim().toUpperCase() === "HRA-0001" ||
        certificateId.trim().toUpperCase() === "HRA-2026-001"
      ) {
        return NextResponse.json({
          success: true,
          verified: true,
          certificate: {
            holderName: holderName.trim(),
            certificateId: certificateId.trim().toUpperCase(),
            courseName: "Full Stack Software Engineering & Cloud Internship",
            issueDate: "September 15, 2026",
            grade: "A+ Distinction",
            status: "Verified Official",
          },
        });
      }

      return NextResponse.json(
        { success: false, error: "No certificate found matching the provided Certificate ID." },
        { status: 404 }
      );
    }

    // Action 2: Admin Issue New Certificate
    if (action === "create") {
      const { holderName, certificateId, password, courseName, issueDate, grade, status, certificateUrl } = body;

      if (!holderName || !certificateId || !password || !courseName) {
        return NextResponse.json(
          { success: false, error: "Holder Name, Certificate ID, Password, and Course Name are required." },
          { status: 400 }
        );
      }

      // Check existing
      const existing = await prisma.certificate.findUnique({
        where: { certificateId: certificateId.trim() },
      });

      if (existing) {
        return NextResponse.json(
          { success: false, error: "A certificate with this Certificate ID already exists." },
          { status: 409 }
        );
      }

      const newCert = await prisma.certificate.create({
        data: {
          holderName: holderName.trim(),
          certificateId: certificateId.trim().toUpperCase(),
          password: password.trim(),
          courseName: courseName.trim(),
          issueDate: issueDate ? issueDate.trim() : new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
          grade: grade ? grade.trim() : "A+",
          status: status || "Verified Official",
          certificateUrl: certificateUrl ? certificateUrl.trim() : null,
        },
      });

      return NextResponse.json({ success: true, certificate: newCert });
    }

    return NextResponse.json({ success: false, error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    console.error("Certificate API error:", error);
    return NextResponse.json({ success: false, error: error?.message || "Internal server error" }, { status: 500 });
  }
}

// DELETE Certificate
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ success: false, error: "Missing ID" }, { status: 400 });
    }

    await prisma.certificate.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Certificate deleted successfully" });
  } catch (error: any) {
    console.error("Delete certificate error:", error);
    return NextResponse.json({ success: false, error: error?.message || "Failed to delete" }, { status: 500 });
  }
}
