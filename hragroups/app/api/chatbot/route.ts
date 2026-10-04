import { NextRequest, NextResponse } from "next/server";

// Exhaustive comprehensive knowledge base about HRA Groups for Gemini AI
const HRA_SYSTEM_INSTRUCTION = `
You are the official, intelligent AI Assistant for "HRA Groups" (Hope + Resilience + Aspire) — a premier enterprise technology solutions provider, digital transformation partner, IT consultancy, and youth talent launchpad headquartered in Hyderabad, Telangana, India.

Your mission: Answer ANY and EVERY question about HRA Groups with high accuracy, clarity, professionalism, and actionable guidance.

============================================================
1. COMPANY IDENTITY & CORE FOUNDATIONS
============================================================
• Brand Name: HRA Groups
• Meaning & Philosophy:
  - H = Hope (Empowering businesses and youth with future-ready digital technologies)
  - R = Resilience (Building robust, secure, and fault-tolerant platforms and architectures)
  - A = Aspire (Driving high-growth ambition, digital transformation, and startup incubation)
• Headquarters & Location: Hyderabad, Telangana, India
• Direct Channels:
  - Phone / WhatsApp: +91 96762 72283
  - Email: contact@hragroups.com
  - Contact Form URL: /contact
• Key Enterprise Milestones:
  - 250+ Production Projects Delivered across Web, Mobile, AI & Cloud
  - 150+ Enterprise & High-Growth Clients Served Globally
  - 500+ Technical & Business Talents Trained & Placed
  - 98% Verified Long-term Client Satisfaction Score (CSAT)

============================================================
2. CORE ENTERPRISE SERVICES & CAPABILITIES
============================================================

A. AI Solutions & Intelligent Automation (/services/ai-solutions):
   • Multi-Agent Systems & Autonomous Pipelines (LangChain, LlamaIndex, CrewAI, AutoGen).
   • Custom LLM Fine-Tuning & Quantization for enterprise domain models.
   • Workflow Automation & Cognitive Business Process Automation (RPA).
   • Predictive Analytics, Deep Learning, NLP, and Computer Vision for real-time document/image processing.
   • Edge-AI integrations for secure offline and multi-cloud operations.

B. Software & Product Engineering (/services/software-development):
   • Full-Stack Web Development using Next.js 16, React 19, TypeScript, Node.js, Python, PostgreSQL, Supabase, Prisma.
   • Native & Cross-Platform Mobile Applications (iOS, Android, React Native, Flutter).
   • Cloud-Native Microservices, serverless architecture, Docker, Kubernetes, AWS, GCP, Azure.
   • Enterprise CRM, ERP, SaaS products, e-commerce engines, and high-concurrency payment gateways.

C. Strategic IT Consultancy (/services/it-consultancy):
   • Technology Roadmapping, IT Audits, Enterprise Architecture Modernization.
   • Legacy Migration, Cloud Readiness & Infrastructure Cost Optimization.
   • Fractional CTO & Advisory services for scaling tech teams.
   • Cybersecurity Assessments, Zero-Trust Architecture, GDPR & Data Compliance.

D. Digital Experiences & UI/UX Branding (/services/digital-experiences):
   • World-class UI/UX Design, Figma wireframing, high-fidelity interactive prototypes.
   • Conversion Rate Optimization (CRO), Micro-interactions, 3D WebGL animations.
   • Corporate Brand Identity, Design Systems, Typography & Logo systems.

E. Certified Technology Courses & Training (/services/courses):
   • Industry-grade curricula in Full-Stack Web Engineering, AI & Machine Learning, Data Science, Cloud & DevOps, and Cyber Defense.
   • Hands-on capstone projects, live mentorship, and recognized certificates.

============================================================
3. EDUCATION, EXAMS & CERTIFICATION PORTALS
============================================================

A. Industry Internship Programs (/internship):
   • Live corporate project exposure on real client codebases.
   • 1-on-1 mentorship by senior tech leads.
   • Flexible tracks: Full-Stack Web Dev, Python & AI, UI/UX Design, Data Analytics, Cloud & DevOps, Mobile App Dev.
   • Durations: 1 month, 2 months, 3 months, 6 months.
   • Performance-based stipends + Letter of Recommendation (LOR) + Verified Digital Certificate.
   • How to apply: Submit details on the /internship page or contact our talent team.

B. Founder Incubation Program (/founder-program & /founder-program/apply):
   • Tailored for student founders, college innovators, and early-stage startup creators.
   • Offerings: Seed tech architecture support, MVP development guidance, business model validation, and launchpad mentorship.

C. Online Exam Portal (/services/exam-portal):
   • Benchmark assessments, technical evaluation tests, coding quizzes, and aptitude certifications.

D. Certificate Verification Portal (/services/certificate-portal):
   • Instant public verification of official HRA Groups Internship & Training completion certificates by entering the unique Certificate ID.

E. Tech Blog & Media Gallery (/services/blog & /gallery & /inside-hra/events & /inside-hra/achievements):
   • Engineering case studies, tech trends, corporate awards, hackathons, and team milestones.

============================================================
4. RESPONSE BEHAVIOR & STYLE GUIDELINES
============================================================
• Be polite, confident, articulate, helpful, and concise.
• Use bullet points, bold text, and clean formatting for readability.
• Mention specific page paths (e.g., \`/internship\`, \`/services/ai-solutions\`, \`/founder-program\`, \`/services/certificate-portal\`, \`/contact\`) to direct users to the right spot.
• For custom quotes, business inquiries, or direct questions, provide the WhatsApp number **+91 96762 72283** or link to **/contact**.
`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Messages array is required." },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

    // Fallback if API key is not yet set in .env
    if (!apiKey || apiKey.trim() === "") {
      const lastUserMsg = messages[messages.length - 1]?.text || "";
      const fallbackReply = getFallbackResponse(lastUserMsg);
      return NextResponse.json({
        reply: fallbackReply,
        isFallback: true,
        note: "Add GEMINI_API_KEY to your .env file to enable live Google Gemini AI generative responses.",
      });
    }

    // Format message history for Google Gemini REST API
    const geminiContents = messages.map((m: { sender: string; text: string }) => ({
      role: m.sender === "bot" ? "model" : "user",
      parts: [{ text: m.text }],
    }));

    // High-speed lightweight models prioritized for fast response times
    const candidateModels = [
      "gemini-3.1-flash-lite",
      "gemini-3.5-flash",
      "gemini-3.8-flash",
      "gemini-3.5-flash-lite",
      "gemma-4-26b-a4b-it",
      "gemini-flash-latest",
    ];

    let botReply: string | null = null;

    for (const modelName of candidateModels) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              system_instruction: {
                parts: [{ text: HRA_SYSTEM_INSTRUCTION }],
              },
              contents: geminiContents,
              generationConfig: {
                temperature: 0.6,
                maxOutputTokens: 400,
              },
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (candidateText) {
            botReply = candidateText;
            break;
          }
        } else {
          const errText = await response.text();
          console.warn(`Gemini (${modelName}) Warning:`, errText);
        }
      } catch (callErr) {
        console.warn(`Gemini (${modelName}) Call Failed:`, callErr);
      }
    }

    if (!botReply) {
      const lastUserMsg = messages[messages.length - 1]?.text || "";
      return NextResponse.json({
        reply: getFallbackResponse(lastUserMsg),
        isFallback: true,
      });
    }

    return NextResponse.json({ reply: botReply, isFallback: false });
  } catch (error: any) {
    console.error("Chat API Route Error:", error);
    return NextResponse.json(
      {
        reply:
          "Thank you for contacting HRA Groups! For immediate assistance, feel free to WhatsApp our support team at +91 96762 72283 or visit our Contact page.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

function getFallbackResponse(query: string): string {
  const lower = query.toLowerCase().trim();

  // Greetings & Pleasantries
  if (/^(hi|hello|hey|greetings|good morning|good afternoon|good evening|howdy)/i.test(lower)) {
    return "Hello! 👋 Welcome to HRA Groups. I'm here to help you learn about our Enterprise Technology Solutions, Internship Programs, Founder Incubation, Exam & Certification Portals, or connect you directly with our advisors in Hyderabad.";
  }

  // Internship & Training Programs
  if (lower.includes("intern") || lower.includes("training") || lower.includes("student") || lower.includes("stipend") || lower.includes("duration") || lower.includes("track")) {
    return "🎓 **HRA Internship Programs:**\nWe offer hands-on industry internships with:\n• Live project development exposure\n• 1-on-1 mentorship from seasoned engineering leads\n• Flexible 1 to 6-month durations\n• Performance-based stipends & verified certification\n\nApply directly at **/internship** to choose your domain track!";
  }

  // Founder Program / Startup Incubation
  if (lower.includes("founder") || lower.includes("startup") || lower.includes("incubation") || lower.includes("pitch")) {
    return "🚀 **HRA Founder Program:**\nAre you a student or early-stage founder building innovative technology? Our incubation initiative provides seed technical resources, development mentorship, and platform architecture support. Apply at **/founder-program**!";
  }

  // AI & Intelligent Automation
  if (lower.includes("ai") || lower.includes("machine learning") || lower.includes("automation") || lower.includes("llm") || lower.includes("agent") || lower.includes("model")) {
    return "🤖 **AI & Intelligent Automation at HRA Groups:**\nWe architect and deploy custom LLM solutions, autonomous multi-agent pipelines, cognitive process automation, and computer vision systems tailored for enterprise scalability. Visit **/services/ai-solutions** or chat with us on WhatsApp to discuss your AI roadmap!";
  }

  // Who are you / About HRA Groups
  if (lower.includes("who are you") || lower.includes("about hra") || lower.includes("about the company") || lower.includes("what is hra") || lower === "about") {
    return "HRA Groups stands for **Hope + Resilience + Aspire**. We are a forward-thinking technology enterprise based in Hyderabad, India, delivering enterprise AI solutions, software development, IT consultancy, talent incubation, and corporate digital services.";
  }

  // Software Development / Web / Mobile / Tech Stack
  if (lower.includes("software") || lower.includes("development") || lower.includes("web") || lower.includes("mobile") || lower.includes("app") || lower.includes("full-stack") || lower.includes("cloud")) {
    return "💻 **Software & Product Engineering:**\nWe build robust full-stack web platforms, mobile applications, microservices, and cloud-native systems using modern frameworks (Next.js, Node.js, Python, PostgreSQL, AWS/GCP). Learn more at **/services/software-development**.";
  }

  // IT Consultancy
  if (lower.includes("consult") || lower.includes("advisory") || lower.includes("strategy") || lower.includes("architecture")) {
    return "📊 **Strategic IT Consultancy:**\nOur seasoned technical architects assist organizations in legacy modernization, cloud migration, cybersecurity audits, and scalable technology roadmaps. Explore **/services/it-consultancy**.";
  }

  // Internship & Training Programs
  if (lower.includes("intern") || lower.includes("training") || lower.includes("student") || lower.includes("stipend") || lower.includes("project")) {
    return "🎓 **HRA Internship Programs:**\nWe offer hands-on industry internships with:\n• Live project development exposure\n• 1-on-1 mentorship from seasoned engineering leads\n• Performance-based stipends\n• Verified certification upon completion\n\nApply directly at **/internship** or verify your tracks!";
  }

  // Founder Program / Startup Incubation
  if (lower.includes("founder") || lower.includes("startup") || lower.includes("incubation") || lower.includes("pitch")) {
    return "🚀 **HRA Founder Program:**\nAre you a student or early-stage founder building innovative technology? Our incubation initiative provides seed technical resources, development mentorship, and platform architecture support. Apply at **/founder-program**!";
  }

  // Careers & Jobs
  if (lower.includes("job") || lower.includes("career") || lower.includes("hiring") || lower.includes("vacancy") || lower.includes("opening") || lower.includes("apply for role")) {
    return "💼 **Careers at HRA Groups:**\nWe are always looking for passionate engineers, AI researchers, UI/UX designers, and business consultants. Check our active openings at **/careers** to submit your resume.";
  }

  // Exam Portal & Certification Verification
  if (lower.includes("exam") || lower.includes("test") || lower.includes("assessment") || lower.includes("portal")) {
    return "📝 **HRA Exam Portal:**\nCandidates can take official technical assessments, qualification evaluations, and aptitude benchmarks at **/services/exam-portal**.";
  }

  if (lower.includes("certificate") || lower.includes("verify") || lower.includes("validation") || lower.includes("credential")) {
    return "📜 **Certificate Verification:**\nYou can instantly verify any HRA Groups completion certificate by entering the credential ID at **/services/certificate-portal**.";
  }

  // Contact / Phone / Email / Address / Location
  if (lower.includes("contact") || lower.includes("phone") || lower.includes("call") || lower.includes("email") || lower.includes("address") || lower.includes("location") || lower.includes("where")) {
    return "📍 **HRA Groups Contact Information:**\n• **Location:** Hyderabad, Telangana, India\n• **Phone / WhatsApp:** [+91 96762 72283](tel:+919676272283)\n• **Email:** contact@hragroups.com\n• **Web Form:** Reach us directly at **/contact**.";
  }

  // WhatsApp
  if (lower.includes("whatsapp") || lower.includes("chat with team") || lower.includes("support")) {
    return "💬 **WhatsApp Support:**\nYou can connect directly with our advisory team on WhatsApp at **+91 96762 72283** or click the green WhatsApp icon right beside this chat widget!";
  }

  // Default context-aware assistance
  return `Thank you for your question regarding "${query}". HRA Groups provides full-spectrum Enterprise IT Services, AI Automation, Internship & Founder Programs, and Certificate Verification. You can chat with our consultants directly on WhatsApp (+91 96762 72283) or visit **/services** to learn more!`;
}
