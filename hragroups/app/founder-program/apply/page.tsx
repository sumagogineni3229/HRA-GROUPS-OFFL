"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function FounderApplyPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    const interests = formData.getAll("interest") as string[];

    const payload = {
      fullName: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      location: (formData.get("location") as string) || "",
      designation: (formData.get("designation") as string) || "",
      company: (formData.get("company") as string) || "",
      industry: (formData.get("industry") as string) || "",
      website: (formData.get("website") as string) || "",
      business: (formData.get("business") as string) || "",
      goals: (formData.get("goals") as string) || "",
      interests,
    };

    try {
      const res = await fetch("/api/founder-program/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Unable to submit application");
      }

      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Unable to submit application");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="founder-apply">
        {/* ========================= HERO ========================= */}
        <section className="apply-hero">
          <div className="apply-hero-inner">
            <div className="apply-label">
              <span />
              HRA GROUPS / FOUNDER BRIDGE
            </div>

            <div className="apply-hero-grid">
              <div>
                <p className="apply-overline">APPLICATION</p>
                <h1>
                  Start Your
                  <br />
                  <em>Founder Journey</em>
                </h1>
                <p className="apply-hero-text">
                  Tell us about yourself, your business and what you are looking to build. Our team will review your application and connect with you.
                </p>
              </div>

              <div className="apply-hero-side">
                <div className="apply-side-number">01</div>
                <p>
                  A professional platform for founders seeking visibility, meaningful connections and growth opportunities.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================= APPLICATION SECTION ========================= */}
        <section className="apply-section">
          <div className="apply-layout">
            <aside className="apply-info">
              <div className="section-index">
                <span>02</span>
                APPLICATION DETAILS
              </div>
              <h2>
                Let&apos;s Get To
                <br />
                <em>Know You</em>
              </h2>
              <p>
                Please provide accurate information so we can understand your professional background and business journey.
              </p>

              <div className="apply-note">
                <span className="note-line" />
                <div>
                  <small>WHAT HAPPENS NEXT</small>
                  <p>
                    Once your application is submitted, the HRA Groups team can review your details and follow up with you regarding the program.
                  </p>
                </div>
              </div>
            </aside>

            <div className="form-wrapper">
              {submitted ? (
                <div className="success-box">
                  <div className="success-icon">✓</div>
                  <p className="success-label">APPLICATION RECEIVED</p>
                  <h2>
                    Thank You For
                    <br />
                    <em>Connecting With Us</em>
                  </h2>
                  <p>Your Founder Bridge application has been submitted successfully.</p>
                  <Link href="/founder-program">
                    Back to Founder Bridge
                    <span>↗</span>
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {/* Block 01 */}
                  <div className="form-block">
                    <div className="form-block-heading">
                      <span>01</span>
                      PERSONAL INFORMATION
                    </div>
                    <div className="form-grid">
                      <div className="field">
                        <label>Full Name *</label>
                        <input
                          type="text"
                          name="name"
                          placeholder="Enter your full name"
                          required
                        />
                      </div>
                      <div className="field">
                        <label>Email Address *</label>
                        <input
                          type="email"
                          name="email"
                          placeholder="you@example.com"
                          required
                        />
                      </div>
                      <div className="field">
                        <label>Phone Number *</label>
                        <input
                          type="tel"
                          name="phone"
                          placeholder="+91"
                          required
                        />
                      </div>
                      <div className="field">
                        <label>Location</label>
                        <input
                          type="text"
                          name="location"
                          placeholder="City / Country"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Block 02 */}
                  <div className="form-block">
                    <div className="form-block-heading">
                      <span>02</span>
                      PROFESSIONAL PROFILE
                    </div>
                    <div className="form-grid">
                      <div className="field">
                        <label>Designation</label>
                        <input
                          type="text"
                          name="designation"
                          placeholder="Founder / CEO / Director"
                        />
                      </div>
                      <div className="field">
                        <label>Company / Brand</label>
                        <input
                          type="text"
                          name="company"
                          placeholder="Company name"
                        />
                      </div>
                      <div className="field">
                        <label>Industry</label>
                        <select name="industry" defaultValue="">
                          <option value="" disabled>
                            Select industry
                          </option>
                          <option value="Technology">Technology</option>
                          <option value="Education">Education</option>
                          <option value="Healthcare">Healthcare</option>
                          <option value="Finance">Finance</option>
                          <option value="Retail">Retail</option>
                          <option value="Manufacturing">Manufacturing</option>
                          <option value="Media">Media</option>
                          <option value="Consulting">Consulting</option>
                          <option value="Real Estate">Real Estate</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div className="field">
                        <label>Website</label>
                        <input
                          type="url"
                          name="website"
                          placeholder="https://"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Block 03 */}
                  <div className="form-block">
                    <div className="form-block-heading">
                      <span>03</span>
                      YOUR FOUNDER JOURNEY
                    </div>
                    <div className="field full">
                      <label>Tell us about your business *</label>
                      <textarea
                        name="business"
                        rows={5}
                        placeholder="Briefly describe your business, product or service..."
                        required
                      />
                    </div>
                    <div className="field full">
                      <label>What are you looking for through Founder Bridge?</label>
                      <textarea
                        name="goals"
                        rows={4}
                        placeholder="Visibility, partnerships, clients, advisory, networking..."
                      />
                    </div>
                  </div>

                  {/* Block 04 */}
                  <div className="form-block">
                    <div className="form-block-heading">
                      <span>04</span>
                      PROGRAM INTEREST
                    </div>
                    <div className="field full">
                      <label>What would you like to explore?</label>
                      <div className="interest-grid">
                        {[
                          "Client Interaction",
                          "Founder Interview",
                          "Podcast",
                          "Publications",
                          "Digital Presence",
                          "Strategic Advisory",
                        ].map((interest) => (
                          <label key={interest} className="interest-option">
                            <input
                              type="checkbox"
                              name="interest"
                              value={interest}
                            />
                            <span>{interest}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Submit */}
                  <div className="form-submit">
                    <p>
                      By submitting this application, you confirm that the information provided is accurate.
                    </p>
                    <button type="submit" disabled={submitting}>
                      {submitting ? "Submitting..." : "Submit Application"}
                      <span>↗</span>
                    </button>
                  </div>

                  {errorMsg && (
                    <p className="form-error" role="alert">
                      {errorMsg}
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>
        </section>

        {/* ========================= BOTTOM ========================= */}
        <section className="apply-bottom">
          <div>
            <span>HRA GROUPS</span>
            <strong>FOUNDER BRIDGE</strong>
          </div>
          <p>Connecting vision with opportunity.</p>
        </section>

        <style jsx>{`
          /* =========================
             BASE
          ========================= */
          .founder-apply {
            --navy: #06101d;
            --navy2: #091625;
            --blue: #3c98ed;
            --blue-light: #70b9f7;
            --white: #f3f7fb;
            --muted: #8b9bab;
            --line: rgba(117, 164, 207, 0.17);

            min-height: 100vh;
            background: var(--navy);
            color: var(--white);
            font-family:
              Inter,
              "Helvetica Neue",
              Arial,
              sans-serif;
            overflow-x: hidden;
          }

          .founder-apply *,
          .founder-apply *::before,
          .founder-apply *::after {
            box-sizing: border-box;
          }

          .founder-apply h1,
          .founder-apply h2,
          .founder-apply h3 {
            font-family:
              "Lucida Bright",
              "Lucida Serif",
              Georgia,
              serif;
            font-weight: 400;
          }

          /* =========================
             HERO
          ========================= */
          .apply-hero {
            padding: 140px 7vw 85px;
            background:
              radial-gradient(
                circle at 80% 20%,
                rgba(45, 135, 225, 0.1) 0%,
                transparent 35%
              ),
              var(--navy);
            border-bottom: 1px solid var(--line);
          }

          .apply-hero-inner {
            max-width: 1380px;
            margin: auto;
          }

          .apply-label {
            display: flex;
            align-items: center;
            gap: 10px;
            color: var(--blue-light);
            font-size: 9px;
            font-weight: 600;
            letter-spacing: 0.23em;
          }

          .apply-label span {
            width: 25px;
            height: 1px;
            background: var(--blue);
          }

          .apply-hero-grid {
            display: grid;
            grid-template-columns: 1fr 300px;
            gap: 100px;
            margin-top: 58px;
            align-items: end;
          }

          .apply-overline {
            margin: 0 0 18px;
            color: #8394a6;
            font-size: 10px;
            letter-spacing: 0.2em;
          }

          .apply-hero h1 {
            margin: 0;
            max-width: 720px;
            font-size: clamp(45px, 5vw, 70px);
            line-height: 1.02;
            letter-spacing: -0.035em;
          }

          .apply-hero h1 em {
            color: var(--blue-light);
            font-style: normal;
          }

          .apply-hero-text {
            max-width: 560px;
            margin: 28px 0 0;
            color: var(--muted);
            font-size: 14px;
            line-height: 1.85;
          }

          .apply-hero-side {
            padding-left: 25px;
            border-left: 1px solid var(--line);
          }

          .apply-side-number {
            margin-bottom: 18px;
            color: var(--blue);
            font-size: 10px;
            letter-spacing: 0.18em;
          }

          .apply-hero-side p {
            margin: 0;
            color: #75879a;
            font-size: 12px;
            line-height: 1.8;
          }

          /* =========================
             APPLICATION
          ========================= */
          .apply-section {
            padding: 110px 7vw;
            background: var(--navy2);
          }

          .apply-layout {
            max-width: 1380px;
            margin: auto;
            display: grid;
            grid-template-columns: 0.65fr 1.35fr;
            gap: 9vw;
          }

          /* =========================
             INFO
          ========================= */
          .section-index {
            display: flex;
            align-items: center;
            gap: 13px;
            color: #708396;
            font-size: 9px;
            letter-spacing: 0.18em;
          }

          .section-index span {
            color: var(--blue);
          }

          .apply-info h2 {
            margin: 22px 0 20px;
            font-size: clamp(40px, 4.3vw, 62px);
            line-height: 1.05;
            letter-spacing: -0.035em;
          }

          .apply-info h2 em {
            color: var(--blue-light);
            font-style: normal;
          }

          .apply-info p {
            margin: 0;
            color: #78899b;
            font-size: 13px;
            line-height: 1.85;
          }

          .apply-note {
            display: flex;
            gap: 16px;
            margin-top: 55px;
            padding-top: 30px;
            border-top: 1px solid var(--line);
          }

          .note-line {
            width: 2px;
            height: 38px;
            background: var(--blue);
            flex-shrink: 0;
          }

          .apply-note small {
            display: block;
            margin-bottom: 6px;
            color: var(--blue-light);
            font-size: 9px;
            letter-spacing: 0.15em;
          }

          .apply-note p {
            color: #637588;
            font-size: 11px;
            line-height: 1.75;
          }

          /* =========================
             FORM
          ========================= */
          .form-wrapper {
            position: relative;
          }

          .form-block {
            margin-bottom: 45px;
            padding-bottom: 35px;
            border-bottom: 1px solid var(--line);
          }

          .form-block-heading {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 26px;
            color: #7a8c9f;
            font-size: 9px;
            letter-spacing: 0.18em;
          }

          .form-block-heading span {
            color: var(--blue);
          }

          .form-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 18px 24px;
          }

          .field {
            display: flex;
            flex-direction: column;
            gap: 8px;
          }

          .field.full {
            margin-bottom: 18px;
          }

          .field label {
            color: #9cb0c3;
            font-size: 11px;
            letter-spacing: 0.04em;
          }

          .field input,
          .field select,
          .field textarea {
            width: 100%;
            border: 1px solid rgba(120, 164, 204, 0.18);
            background: rgba(5, 15, 27, 0.55);
            color: var(--white);
            font-family: inherit;
            font-size: 13px;
            outline: none;
            transition:
              border-color 0.25s ease,
              background 0.25s ease;
          }

          .field input,
          .field select {
            height: 48px;
            padding: 0 14px;
          }

          .field textarea {
            padding: 14px;
            resize: vertical;
            min-height: 115px;
            line-height: 1.7;
          }

          .field input::placeholder,
          .field textarea::placeholder {
            color: #4f6071;
          }

          .field select {
            color: #8798aa;
          }

          .field select option {
            background: #091625;
            color: #fff;
          }

          .field input:focus,
          .field select:focus,
          .field textarea:focus {
            border-color: rgba(65, 157, 239, 0.65);
            background: rgba(8, 24, 42, 0.85);
          }

          /* =========================
             INTERESTS
          ========================= */
          .interest-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
          }

          .interest-option {
            display: flex;
            align-items: center;
            gap: 12px;
            min-height: 48px;
            padding: 0 13px;
            border: 1px solid rgba(120, 164, 204, 0.14);
            background: rgba(5, 15, 27, 0.45);
            color: #8798aa;
            font-size: 11px;
            cursor: pointer;
            transition:
              border-color 0.25s ease,
              color 0.25s ease,
              background 0.25s ease;
          }

          .interest-option:hover {
            border-color: rgba(65, 157, 239, 0.45);
            color: #dce8f3;
            background: rgba(45, 135, 225, 0.05);
          }

          .interest-option input {
            width: 14px;
            height: 14px;
            accent-color: var(--blue);
          }

          /* =========================
             SUBMIT
          ========================= */
          .form-submit {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 35px;
          }

          .form-submit p {
            max-width: 410px;
            margin: 0;
            color: #627486;
            font-size: 10px;
            line-height: 1.7;
          }

          .form-submit button {
            display: inline-flex;
            align-items: center;
            gap: 28px;
            min-height: 49px;
            padding: 0 20px;
            border: 0;
            background: var(--blue);
            color: white;
            font-family: inherit;
            font-size: 10px;
            font-weight: 600;
            letter-spacing: 0.13em;
            text-transform: uppercase;
            cursor: pointer;
            transition:
              transform 0.3s ease,
              background 0.3s ease;
          }

          .form-submit button span {
            font-size: 16px;
          }

          .form-submit button:hover {
            transform: translateY(-2px);
            background: #58a9f4;
          }

          .form-error {
            margin-top: 15px;
            color: #ff6b6b;
            font-size: 11px;
          }

          /* =========================
             SUCCESS
          ========================= */
          .success-box {
            min-height: 500px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            padding: 55px;
            border: 1px solid var(--line);
            background: rgba(6, 17, 30, 0.7);
          }

          .success-icon {
            width: 44px;
            height: 44px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid rgba(65, 157, 239, 0.5);
            color: var(--blue-light);
            font-size: 17px;
          }

          .success-label {
            margin: 30px 0 15px;
            color: var(--blue-light);
            font-size: 9px;
            letter-spacing: 0.18em;
          }

          .success-box h2 {
            margin: 0;
            font-size: clamp(40px, 4.2vw, 60px);
            line-height: 1.03;
          }

          .success-box h2 em {
            color: var(--blue-light);
            font-style: normal;
          }

          .success-box > p:not(.success-label) {
            max-width: 430px;
            margin: 25px 0;
            color: var(--muted);
            font-size: 13px;
            line-height: 1.8;
          }

          .success-box a {
            display: inline-flex;
            align-items: center;
            gap: 22px;
            color: #dbe7f1;
            text-decoration: none;
            font-size: 10px;
            letter-spacing: 0.12em;
            text-transform: uppercase;
          }

          .success-box a span {
            color: var(--blue);
          }

          /* =========================
             BOTTOM
          ========================= */
          .apply-bottom {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 25px 7vw;
            border-top: 1px solid var(--line);
            background: #050d17;
          }

          .apply-bottom div {
            display: flex;
            align-items: center;
            gap: 18px;
          }

          .apply-bottom span {
            color: var(--blue);
            font-size: 9px;
            letter-spacing: 0.18em;
          }

          .apply-bottom strong {
            color: #b8c6d4;
            font-size: 9px;
            font-weight: 500;
            letter-spacing: 0.16em;
          }

          .apply-bottom p {
            margin: 0;
            color: #526476;
            font-size: 10px;
          }

          /* =========================
             RESPONSIVE
          ========================= */
          @media (max-width: 950px) {
            .apply-hero-grid {
              grid-template-columns: 1fr;
              gap: 45px;
            }

            .apply-hero-side {
              max-width: 500px;
            }

            .apply-layout {
              grid-template-columns: 1fr;
              gap: 65px;
            }

            .apply-info {
              max-width: 650px;
            }

            .apply-note {
              margin-top: 35px;
            }
          }

          @media (max-width: 620px) {
            .apply-hero {
              padding: 95px 22px 60px;
            }

            .apply-hero-grid {
              margin-top: 45px;
            }

            .apply-hero h1 {
              font-size: 42px;
            }

            .apply-hero-text {
              font-size: 13px;
            }

            .apply-section {
              padding: 75px 22px;
            }

            .apply-info h2 {
              margin-top: 30px;
              font-size: 40px;
            }

            .form-grid {
              grid-template-columns: 1fr;
              gap: 20px;
            }

            .interest-grid {
              grid-template-columns: 1fr;
            }

            .form-submit {
              align-items: flex-start;
              flex-direction: column;
            }

            .form-submit button {
              width: 100%;
              justify-content: space-between;
            }

            .success-box {
              min-height: 420px;
              padding: 30px;
            }

            .success-box h2 {
              font-size: 39px;
            }

            .apply-bottom {
              padding: 22px;
              align-items: flex-start;
              flex-direction: column;
              gap: 14px;
            }
          }
        `}</style>
      </main>

      <Footer />
    </>
  );
}
