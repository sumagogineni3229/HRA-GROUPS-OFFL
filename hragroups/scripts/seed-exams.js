const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const count = await prisma.assessment.count();
  if (count === 0) {
    await prisma.assessment.create({
      data: {
        title: "Full Stack Web Development Certification Assessment",
        category: "Certification Exam",
        courseCohort: "FS-2026 Cohort 4",
        examKey: "HRA-FS2026",
        durationMins: 30,
        passScorePct: 70,
        description: "Comprehensive test covering React, Next.js, Node.js, and Database Architecture.",
        questions: [
          {
            id: "q1",
            text: "What is the primary benefit of Next.js Server-Side Rendering (SSR)?",
            options: [
              "Runs exclusively on client browsers with no server required",
              "Pre-renders HTML per request, improving SEO and dynamic page performance",
              "Converts JavaScript directly into C++ machine binaries",
              "Removes all CSS requirements from modern web pages"
            ],
            correctOptionIndex: 1,
            points: 2
          },
          {
            id: "q2",
            text: "In React, which hook is primarily used for handling component side effects?",
            options: ["useState", "useMemo", "useEffect", "useReducer"],
            correctOptionIndex: 2,
            points: 2
          },
          {
            id: "q3",
            text: "Which SQL clause is used to filter records based on aggregate functions?",
            options: ["WHERE", "HAVING", "GROUP BY", "ORDER BY"],
            correctOptionIndex: 1,
            points: 2
          },
          {
            id: "q4",
            text: "What does REST stand for in modern web API architecture?",
            options: [
              "Representational State Transfer",
              "Reactive System Test Protocol",
              "Remote Execution Server Tree",
              "Redundant Storage Technology"
            ],
            correctOptionIndex: 0,
            points: 2
          },
          {
            id: "q5",
            text: "What is the purpose of Prisma ORM in modern web applications?",
            options: [
              "Type-safe database access and query building with schema migrations",
              "Styling UI components with TailwindCSS",
              "Managing client-side browser cookies exclusively",
              "Generating 3D web animations for hero banners"
            ],
            correctOptionIndex: 0,
            points: 2
          }
        ]
      }
    });

    await prisma.assessment.create({
      data: {
        title: "Cloud & DevOps Diagnostic Test",
        category: "Diagnostic Test",
        courseCohort: "DevOps Batch 2",
        examKey: "HRA-DEVOPS",
        durationMins: 20,
        passScorePct: 75,
        description: "Core evaluation on Docker, Kubernetes, CI/CD pipelines, and AWS Cloud foundations.",
        questions: [
          {
            id: "dq1",
            text: "What is the fundamental difference between Docker containers and Virtual Machines (VMs)?",
            options: [
              "Containers share the host OS kernel and are lightweight, while VMs run full guest OS instances",
              "VMs do not require hardware virtualization",
              "Containers can only run on Windows machines",
              "There is no functional difference"
            ],
            correctOptionIndex: 0,
            points: 2
          },
          {
            id: "dq2",
            text: "Which Kubernetes object is responsible for ensuring a specified number of pod replicas are running?",
            options: ["ReplicaSet / Deployment", "ConfigMap", "Ingress", "PersistentVolume"],
            correctOptionIndex: 0,
            points: 2
          }
        ]
      }
    });
    console.log("Seeded sample assessments successfully!");
  } else {
    console.log("Assessments already exist in database.");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
