"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  GraduationCap,
  Plus,
  Trash2,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Layers,
  BookOpen,
  Upload,
  Link2,
  Clock,
  Sparkles,
} from "lucide-react";

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Form states
  const [title, setTitle] = useState("");
  const [badge, setBadge] = useState("Specialization Program");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("4 Months");
  const [level, setLevel] = useState("Intermediate");
  const [syllabusText, setSyllabusText] = useState("");
  const [imageUrlsText, setImageUrlsText] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const loadCourses = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/courses");
      const data = await res.json();
      if (data.success) {
        setCourses(data.courses);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const handleCreateCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    setMessage(null);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("badge", badge);
      formData.append("description", description);
      formData.append("duration", duration);
      formData.append("level", level);
      formData.append("syllabus", syllabusText);
      formData.append("imageUrls", imageUrlsText);

      if (selectedFiles) {
        for (let i = 0; i < selectedFiles.length; i++) {
          formData.append("files", selectedFiles[i]);
        }
      }

      const res = await fetch("/api/courses", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setMessage({ type: "success", text: "New course created and published live successfully!" });
        // Reset form
        setTitle("");
        setBadge("Specialization Program");
        setDescription("");
        setDuration("4 Months");
        setLevel("Intermediate");
        setSyllabusText("");
        setImageUrlsText("");
        setSelectedFiles(null);
        setShowModal(false);
        loadCourses();
      } else {
        setMessage({ type: "error", text: data.error || "Failed to create course." });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Network error occurred." });
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this dynamic course?")) return;

    try {
      const res = await fetch("/api/courses", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success) {
        setCourses(courses.filter((c) => c.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto font-sans">
      {/* Header Banner */}
      <div className="rounded-3xl bg-white border border-slate-200/80 p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-bold text-[#0052cc] uppercase tracking-wider block">
            Academic &amp; Training
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#172947] mt-1">
            Courses &amp; Curriculum Manager
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Manage course offerings. New courses added here immediately appear on the public website courses page while preserving core existing programs.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/services/courses"
            target="_blank"
            className="px-4 py-2.5 rounded-2xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all flex items-center gap-1.5 shadow-xs"
          >
            <span>View Public Courses Page</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={() => setShowModal(true)}
            className="px-5 py-2.5 rounded-2xl bg-[#0052cc] hover:bg-[#0041a3] text-white text-xs sm:text-sm font-bold tracking-wide transition-all shadow-md shadow-blue-500/20 flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Course</span>
          </button>
        </div>
      </div>

      {/* Success/Error Alerts */}
      {message && (
        <div
          className={`p-4 rounded-2xl border flex items-center gap-3 text-sm ${
            message.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-800"
              : "bg-red-50 border-red-200 text-red-800"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-600" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      {/* Modal to Add Course */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-6 relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-xl font-extrabold text-[#172947]">Create &amp; Publish New Course</h3>
                <p className="text-xs text-slate-500">Add course syllabus, details, and banners to the website</p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateCourse} className="space-y-4">
              {/* Title & Badge */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">
                    Course Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Cyber Security & Ethical Hacking"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0052cc]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">
                    Specialization Badge / Tag
                  </label>
                  <input
                    type="text"
                    value={badge}
                    onChange={(e) => setBadge(e.target.value)}
                    placeholder="e.g. Cyber Defense Mastery"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0052cc]"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">
                  Course Overview Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={2}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Master enterprise security defense, network protocols, penetration testing, and zero trust governance..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0052cc] resize-none"
                />
              </div>

              {/* Duration & Level */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">Duration</label>
                  <input
                    type="text"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="e.g. 4 Months (Weekend / Regular)"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0052cc]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">Difficulty Level</label>
                  <select
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0052cc] bg-white"
                  >
                    <option value="Beginner to Advanced">Beginner to Advanced</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced Specialization">Advanced Specialization</option>
                  </select>
                </div>
              </div>

              {/* Syllabus Points */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">
                  Syllabus Highlights <span className="text-xs font-normal text-slate-400">(one bullet point per line)</span>
                </label>
                <textarea
                  rows={4}
                  value={syllabusText}
                  onChange={(e) => setSyllabusText(e.target.value)}
                  placeholder={"Network Fundamentals & Linux Administration\nWeb Application Vulnerability Assessment\nSIEM Tools & SOC Monitoring (Splunk)\nLive Incident Response Projects\nInterview prep & Placement assistance"}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-mono focus:outline-none focus:border-[#0052cc] resize-none"
                />
              </div>

              {/* Image URLs or Files */}
              <div className="space-y-3 pt-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">
                    Course Banner Image URLs <span className="text-xs font-normal text-slate-400">(one URL per line for carousel)</span>
                  </label>
                  <textarea
                    rows={2}
                    value={imageUrlsText}
                    onChange={(e) => setImageUrlsText(e.target.value)}
                    placeholder="https://example.com/banner1.jpg&#10;https://example.com/banner2.jpg"
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs font-mono focus:outline-none focus:border-[#0052cc] resize-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">
                    Or Upload Image Files:
                  </label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => setSelectedFiles(e.target.files)}
                    className="w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-[#0052cc] hover:file:bg-blue-100 cursor-pointer"
                  />
                </div>
              </div>

              {/* Submit Action */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creating}
                  className="px-6 py-2.5 rounded-xl bg-[#0052cc] hover:bg-[#0041a3] text-white text-xs font-bold transition-all shadow-md shadow-blue-500/20 disabled:opacity-50 flex items-center gap-2 cursor-pointer"
                >
                  {creating ? "Saving Course..." : "Publish Course Live"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Dynamic Courses List */}
      <div className="rounded-3xl bg-white border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-extrabold text-[#172947]">
              Dynamic Database Courses ({courses.length})
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Custom courses published via this panel (automatically combined with the 3 core programs on the public website)
            </p>
          </div>
        </div>

        {loading ? (
          <div className="py-12 text-center text-sm text-slate-400">Loading courses...</div>
        ) : courses.length === 0 ? (
          <div className="py-14 text-center space-y-3 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            <GraduationCap className="w-10 h-10 text-slate-300 mx-auto" />
            <div className="text-sm font-bold text-slate-700">No custom courses added yet</div>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Click &quot;Add New Course&quot; above to create additional courses with custom syllabus, duration, and carousel images.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div
                key={course.id}
                className="rounded-2xl bg-white border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/10] bg-slate-900 overflow-hidden">
                    <img
                      src={course.images?.[0] || "https://assets.zyrosite.com/Y4LvROeE7gfaLJG1/aiml001-3KI9bBOEO3ocT4KR.jpg"}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-xs text-[10px] font-extrabold text-white shadow-xs uppercase">
                      {course.badge}
                    </span>
                  </div>
                  <div className="p-5 space-y-3">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span>{course.duration || "4 Months"}</span>
                      <span>•</span>
                      <span className="text-[#0052cc] font-semibold">{course.level || "Intermediate"}</span>
                    </div>
                    <h4 className="font-bold text-base text-[#172947] line-clamp-1">
                      {course.title}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-2">{course.description}</p>
                    
                    {course.syllabus && course.syllabus.length > 0 && (
                      <div className="pt-2 border-t border-slate-100">
                        <span className="text-[11px] font-bold text-slate-600 block mb-1">
                          Highlights ({course.syllabus.length} topics):
                        </span>
                        <ul className="text-xs text-slate-500 space-y-1 list-disc list-inside line-clamp-2">
                          {course.syllabus.slice(0, 2).map((s: string, idx: number) => (
                            <li key={idx} className="truncate">{s}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-5 pt-0 flex items-center justify-between border-t border-slate-100 mt-2">
                  <span className="text-xs font-semibold text-slate-500">
                    {course.images?.length || 1} Carousel {course.images?.length === 1 ? "Image" : "Images"}
                  </span>
                  <button
                    onClick={() => handleDelete(course.id)}
                    className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 transition-colors cursor-pointer"
                    title="Delete Course"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Core Built-in Courses Reference */}
      <div className="rounded-3xl bg-slate-50 border border-slate-200/80 p-6 sm:p-8 space-y-4">
        <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wider">
          Permanent Core Website Courses (Always Preserved):
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
            <span className="text-[10px] font-bold text-blue-600 uppercase">AI / ML Specialization</span>
            <div className="font-bold text-sm text-[#172947] mt-1">Artificial Intelligence &amp; Machine Learning</div>
            <p className="text-xs text-slate-500 mt-1">Python, TensorFlow, Deep Learning, NLP &amp; Computer Vision</p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
            <span className="text-[10px] font-bold text-sky-600 uppercase">Full Stack Mastery</span>
            <div className="font-bold text-sm text-[#172947] mt-1">Python Full Stack Development</div>
            <p className="text-xs text-slate-500 mt-1">React.js, Python, Django, REST APIs, Databases &amp; Cloud</p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
            <span className="text-[10px] font-bold text-emerald-600 uppercase">Cloud &amp; Infrastructure</span>
            <div className="font-bold text-sm text-[#172947] mt-1">AWS DevOps Engineering</div>
            <p className="text-xs text-slate-500 mt-1">CI/CD Pipelines, Docker, Kubernetes, AWS &amp; IaC</p>
          </div>
        </div>
      </div>
    </div>
  );
}
