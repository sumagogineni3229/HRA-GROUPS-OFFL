"use client";

import React from "react";
import { AdminModulePlaceholder } from "@/components/AdminModulePlaceholder";

export default function AdminGalleryPage() {
  return (
    <AdminModulePlaceholder
      category="Media & Showcase"
      title="Gallery & Event Media"
      subtitle="Upload campus images, convocation photos, event highlights, and office media."
      actionLabel="Upload Media"
      stats={[
        { label: "Total Photos", value: "86", color: "blue" },
        { label: "Event Albums", value: "9", color: "sky" },
        { label: "Storage Used", value: "1.4 GB", color: "purple" },
      ]}
      columns={["Media Preview / Name", "Album / Event", "Upload Date", "Dimensions", "Actions"]}
      rows={[
        {
          name: <div className="font-bold text-[#172947]">Corporate Excellence Awards Ceremony 2026</div>,
          album: <span className="text-xs px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 font-semibold">Awards</span>,
          date: "Sep 22, 2026",
          dimensions: "1920 x 1080 (HD)",
          action: <button className="text-xs font-bold text-[#0052cc] hover:underline">Manage Album</button>,
        },
        {
          name: <div className="font-bold text-[#172947]">Internship Cohort Graduation & Certifications</div>,
          album: <span className="text-xs px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 font-semibold">Graduation</span>,
          date: "Aug 30, 2026",
          dimensions: "2400 x 1600",
          action: <button className="text-xs font-bold text-[#0052cc] hover:underline">Manage Album</button>,
        },
      ]}
    />
  );
}
