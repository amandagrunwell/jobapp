import jsPDF from "jspdf";
import { JobDetailsData } from "./GenerateJobDetail";

const addFooterVectors = (
  pdf: jsPDF,
  pageWidth: number,
  pageHeight: number
) => {
  const primaryColor = "#4F46E5";

  pdf.saveGraphicsState();

  const waveHeight = 15;
  const waveStartY = pageHeight - waveHeight;

  pdf.setDrawColor(primaryColor);
  pdf.setLineWidth(1);
  pdf.line(0, waveStartY, pageWidth, waveStartY);

  // const circleRadius = 2;
  // const circleSpacing = 15;
  // for (let x = circleSpacing; x < pageWidth; x += circleSpacing) {
  //   pdf.setFillColor(primaryColor);
  //   pdf.circle(x, waveStartY - 8, circleRadius, "F");
  // }

  const cornerSize = 20;
  pdf.setFillColor(primaryColor);
  pdf.setGState(new (pdf as any).GState({ opacity: 0.1 }));
  pdf.rect(0, waveStartY - cornerSize, cornerSize, cornerSize, "F");
  pdf.rect(
    pageWidth - cornerSize,
    waveStartY - cornerSize,
    cornerSize,
    cornerSize,
    "F"
  );

  pdf.setGState(new (pdf as any).GState({ opacity: 1.0 }));

  const sidePatternWidth = 8;
  for (let y = waveStartY - 30; y > 50; y -= 12) {
    pdf.setFillColor(primaryColor);
    pdf.setGState(new (pdf as any).GState({ opacity: 0.15 }));
    pdf.triangle(0, y, sidePatternWidth, y - 4, 0, y - 8, "F");
  }

  for (let y = waveStartY - 30; y > 50; y -= 12) {
    pdf.setFillColor(primaryColor);
    pdf.setGState(new (pdf as any).GState({ opacity: 0.15 }));
    pdf.triangle(
      pageWidth,
      y,
      pageWidth - sidePatternWidth,
      y - 4,
      pageWidth,
      y - 8,
      "F"
    );
  }

  pdf.setGState(new (pdf as any).GState({ opacity: 1.0 }));

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(8);
  pdf.setTextColor(79, 70, 229);
  pdf.text(`Apex Focus Group - Confidential`, pageWidth / 2, pageHeight - 5, {
    align: "center",
  });

  pdf.restoreGraphicsState();
};
const addSection = (
  pdf: jsPDF,
  yPosition: number,
  title: string,
  content: string[],
  margin: number,
  pageWidth: number,
  pageHeight: number,
  isBulletPoints: boolean = false,
  isBoldTitle: boolean = true
) => {
  let currentY = yPosition;
  const contentWidth = pageWidth - 2 * margin;

  // Section title
  if (title) {
    pdf.setFont("helvetica", isBoldTitle ? "bold" : "normal");
    pdf.setFontSize(12);
    pdf.text(title, margin, currentY);
    currentY += 8;
  }

  // Section content
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);

  content.forEach((line) => {
    if (line.trim() === "") {
      currentY += 3;
      return;
    }

    const lines = pdf.splitTextToSize(line, contentWidth);
    lines.forEach((textLine: string) => {
      if (currentY > pageHeight - 40) {
        pdf.addPage();
        addFooterVectors(pdf, pageWidth, pageHeight);
        currentY = 20;
      }

      if (isBulletPoints && textLine.startsWith("-")) {
        const bulletContent = textLine.substring(1).trim();
        const bulletLines = pdf.splitTextToSize(
          bulletContent,
          contentWidth - 10
        );

        bulletLines.forEach((bulletLine: string, index: number) => {
          if (currentY > pageHeight - 40) {
            pdf.addPage();
            addFooterVectors(pdf, pageWidth, pageHeight);
            currentY = 20;
          }
          if (index === 0) {
            pdf.text("•", margin, currentY);
            pdf.text(bulletLine, margin + 5, currentY);
          } else {
            pdf.text(bulletLine, margin + 5, currentY);
          }
          currentY += 5;
        });
      } else {
        // Handle bold text within paragraphs
        if (textLine.includes("**") && textLine.split("**").length === 3) {
          const parts = textLine.split("**");
          pdf.text(parts[0], margin, currentY);
          pdf.setFont("helvetica", "bold");
          pdf.text(parts[1], margin + pdf.getTextWidth(parts[0]), currentY);
          pdf.setFont("helvetica", "normal");
          pdf.text(
            parts[2],
            margin + pdf.getTextWidth(parts[0] + parts[1]),
            currentY
          );
        } else {
          pdf.text(textLine, margin, currentY);
        }
        currentY += 5;
      }
    });
    currentY += 2;
  });

  return currentY + 5;
};

export const generatePDF = (jobDetailsData: JobDetailsData) => {
  const pdf = new jsPDF("p", "mm", "a4");
  const margin = 25;
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const contentWidth = pageWidth - 2 * margin;

  let yPosition = 25;

  // Add footer vectors to first page
  addFooterVectors(pdf, pageWidth, pageHeight);

  // Header with logo (centered)
  if (jobDetailsData.logoUrl) {
    try {
      const logoWidth = 70;
      const logoHeight = 15;
      const x = (pageWidth - logoWidth) / 2;
      pdf.addImage(
        jobDetailsData.logoUrl,
        "PNG",
        x,
        yPosition,
        logoWidth,
        logoHeight
      );
      yPosition += 35;
    } catch (error) {
      console.log("Error adding logo, continuing without it", error);
      yPosition += 10;
    }
  } else {
    yPosition += 10;
  }

  // ABOUTApex Focus Group section
  yPosition = addSection(
    pdf,
    yPosition,
    "ABOUT Apex Focus Group",
    [
      "Apex Focus Group was founded to integrate cutting-edge technologies in web, mobility, user experience design, workflows, engagement techniques, and cloud computing to significantly improve healthcare and, ultimately, the patient experience. This is the foundation of theApex Focus Group software platform.",
      "",
      "After listening to hospitals, surgeons, medical staff, post-acute providers, and patients, we focused on solving the most complex problems to make healthcare better.",
    ],
    margin,
    pageWidth,
    pageHeight,
    false,
    true
  );

  // MUST READ section
  yPosition = addSection(
    pdf,
    yPosition,
    "MUST READ:",
    [
      `The Board is focused on expanding the company's strong reputation. We are committed to delivering the highest quality service globally and are seeking a qualified ${jobDetailsData.position} to join our team. You will play a key role in supporting our company, customers, business partners, and clients.`,
    ],
    margin,
    pageWidth,
    pageHeight,
    false,
    true
  );

  // ABOUT THE ROLE section
  yPosition = addSection(
    pdf,
    yPosition,
    "ABOUT THE ROLE",
    [
      "This is an exciting opportunity for someone seeking growth while working with a dynamic and expanding team. It is ideal for candidates who are eager to be associated with a recognized name in the healthcare industry. We offer long-term career opportunities.",
    ],
    margin,
    pageWidth,
    pageHeight,
    false,
    true
  );

  // ESSENTIAL DUTIES AND RESPONSIBILITIES section
  if (yPosition > pageHeight - 100) {
    pdf.addPage();
    addFooterVectors(pdf, pageWidth, pageHeight);
    yPosition = 20;
  }

  yPosition = addSection(
    pdf,
    yPosition,
    "ESSENTIAL DUTIES AND RESPONSIBILITIES",
    [
      "Provide administrative support to ensure efficient operations",
      "Transcribe documents from dictated tapes",
      "Ensure deadlines are met and adapt to changing priorities",
      "Uses word processing and presentation software to create and edit documents",
      "Inputs and updates information in databases and spreadsheets",
      "Operates and maintains office equipment including printers, copier",
      "Maintain confidentiality in accordance with security policies",
    ],
    margin,
    pageWidth,
    pageHeight,
    true,
    true
  );

  // SKILLS AND QUALIFICATIONS section
  yPosition = addSection(
    pdf,
    yPosition,
    "SKILLS AND QUALIFICATIONS",
    [
      "Digital literacy and research skills, including the ability to analyze the reliability of information",
      "Ability to work well under pressure and manage multiple deadlines",
      "Strong time management, multitasking, and flexibility",
      "Excellent knowledge of word processing tools and spreadsheets",
      "Familiarity with office equipment",
      "Strong English language skills",
      "High regard for confidentiality",
      "High school diploma required; additional computer training or certification is a plus",
    ],
    margin,
    pageWidth,
    pageHeight,
    true,
    true
  );

  // SALARY / BENEFITS / HOURS / OVERVIEW section
  if (yPosition > pageHeight - 150) {
    pdf.addPage();
    addFooterVectors(pdf, pageWidth, pageHeight);
    yPosition = 20;
  }

  yPosition = addSection(
    pdf,
    yPosition,
    "SALARY / BENEFITS / HOURS / OVERVIEW",
    [
      "**Position Type:**   Remote, work-from-home",
      "**Schedule:**   Flexible working hours",
      "**Pay:**",
      `- Regular: $${jobDetailsData.regularPay}/hr`,
      `- Training: $${jobDetailsData.trainingPay}/hr`,
      "**Pay Frequency:**   Weekly or biweekly via direct deposit or paycheck",
      "**Work Limit:**   Maximum 40 hours per week",
      "**Employment Type:**   Full-time or part-time (your choice), not an independent contractor",
      "",
      "**Full-Time Hours:**",
      jobDetailsData.fullTimeHours,
      "",
      "**Part-Time Hours:**",
      jobDetailsData.partTimeHours,
    ],
    margin,
    pageWidth,
    pageHeight,
    true,
    true
  );

  // BENEFITS section
  if (yPosition > pageHeight - 100) {
    pdf.addPage();
    addFooterVectors(pdf, pageWidth, pageHeight);
    yPosition = 20;
  }

  yPosition = addSection(
    pdf,
    yPosition,
    "BENEFITS",
    [
      `- Health, dental, and vision insurance`,
      `- Fully remote work environment`,
      `- ${jobDetailsData.paidTimeOff} days of paid time off (vacation, sick leave, and public holidays)`,
      `- Family leave (maternity/paternity)`,
      `- Tuition reimbursement`,
      `- Sign-up bonus (all qualified candidates are eligible)`,
    ],
    margin,
    pageWidth,
    pageHeight,
    true,
    true
  );

  // WORKING EQUIPMENT section
  yPosition = addSection(
    pdf,
    yPosition,
    "WORKING EQUIPMENT",
    [
      "All required equipment will be provided and funded by the company — no out-of-pocket costs. This includes:",
      "",
      `- ${jobDetailsData.equipmentDetails}`,
      "- Software for speed, data processing, time tracking, and task efficiency",
      "",
      "Your supervisor will provide full details regarding equipment usage and delivery.",
    ],
    margin,
    pageWidth,
    pageHeight,
    true,
    true
  );

  // TRAINING section
  yPosition = addSection(
    pdf,
    yPosition,
    "TRAINING",
    [
      `Training is conducted online for ${jobDetailsData.trainingDuration} and is fully paid. You will receive:`,
      "",
      "- A staff username and password to access our internal platform",
      "- Secure access to company data and tasks",
      "- Direct connection with theApex Focus Group team",
      "",
      "Are you capable of handling the responsibilities listed above? And we trust that working remotely will not be a challenge for you.",
    ],
    margin,
    pageWidth,
    pageHeight,
    true,
    true
  );

  // Signature section
  if (yPosition > pageHeight - 50) {
    pdf.addPage();
    addFooterVectors(pdf, pageWidth, pageHeight);
    yPosition = 20;
  }

  yPosition += 20;
  pdf.text("Sincerely,", margin, yPosition);
  yPosition += 15;

  pdf.setFont("helvetica", "bold");
  pdf.text(jobDetailsData.hrManagerName, margin, yPosition);
  yPosition += 5;
  pdf.setFont("helvetica", "normal");
  pdf.text("HR Manager", margin, yPosition);
  yPosition += 5;
  pdf.text("Apex Focus Group", margin, yPosition);

  pdf.save(`apex-group-job-details.pdf`);
};
