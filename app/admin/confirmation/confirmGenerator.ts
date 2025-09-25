import jsPDF from "jspdf";
import { ConfirmationData } from "./GenerateConfirm";

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
  isBulletPoints: boolean = false
) => {
  let currentY = yPosition;
  const contentWidth = pageWidth - 2 * margin; // Use full width within margins

  // Section title (left aligned)
  if (title) {
    pdf.setFont("helvetica", "bold");
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
        // Handle bullet points with proper indentation
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
        // Regular text left aligned
        pdf.text(textLine, margin, currentY);
        currentY += 5;
      }
    });
    currentY += 2;
  });

  return currentY + 5;
};

const formatDateForPDF = (dateString: string): string => {
  if (!dateString || dateString.length !== 10) return "Invalid Date";

  const [year, month, day] = dateString.split("-").map(Number);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  if (month < 1 || month > 12 || day < 1 || day > 31) {
    return "Invalid Date";
  }

  return `${monthNames[month - 1]} ${day}, ${year}`;
};

export const generatePDF = (confirmationData: ConfirmationData) => {
  const pdf = new jsPDF("p", "mm", "a4");
  const margin = 25; // Increased margin for better readability
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const contentWidth = pageWidth - 2 * margin;

  let yPosition = 25;

  // Add footer vectors to first page
  addFooterVectors(pdf, pageWidth, pageHeight);

  // Header with logo (centered)
  if (confirmationData.logoUrl) {
    try {
      const logoWidth = 70;
      const logoHeight = 15;
      const x = (pageWidth - logoWidth) / 2;
      pdf.addImage(
        confirmationData.logoUrl,
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

  // Document title (centered)
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(18);
  pdf.setTextColor(79, 70, 229);
  pdf.text("JOB CONFIRMATION LETTER", pageWidth / 2, yPosition, {
    align: "center",
  });
  yPosition += 15;

  // Date (right aligned within content bounds)
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);
  pdf.setTextColor(0, 0, 0);
  const formattedDate = formatDateForPDF(confirmationData.date);
  pdf.text(formattedDate, margin + contentWidth, yPosition, {
    align: "right",
  });
  yPosition += 10;

  // Salutation (left aligned)
  pdf.text(`Dear ${confirmationData.employeeName},`, margin, yPosition);
  yPosition += 8;

  // Introduction paragraph (left aligned with proper wrapping)
  const introText = `We are pleased to formally offer you the position of ${confirmationData.position}. After a careful review of your responses by the company executives, we were impressed and believe you will be a great fit for our progressive team.`;
  const introLines = pdf.splitTextToSize(introText, contentWidth);
  introLines.forEach((line: string) => {
    pdf.text(line, margin, yPosition);
    yPosition += 5;
  });
  yPosition += 8;

  // Salary information (left aligned)
  const salaryText = `Your starting salary is $${confirmationData.hourlyRate}/hr. based on experience and workload. You will be eligible for all benefits after you begin training fully.`;
  const salaryLines = pdf.splitTextToSize(salaryText, contentWidth);
  salaryLines.forEach((line: string) => {
    pdf.text(line, margin, yPosition);
    yPosition += 5;
  });
  yPosition += 10;

  // Position details (left aligned)
  const positionText = `This is a remote Full-time position, Monday to Friday, 9 AM to 5 PM, requiring at least 40 hours per week. You will be reporting to your supervisor, ${confirmationData.supervisorName}, via Zoom. All work will be conducted remotely.`;
  const positionLines = pdf.splitTextToSize(positionText, contentWidth);
  positionLines.forEach((line: string) => {
    pdf.text(line, margin, yPosition);
    yPosition += 5;
  });
  yPosition += 15;

  // Separator line (full width within margins)
  pdf.setDrawColor(79, 70, 229);
  pdf.setLineWidth(0.5);
  pdf.line(margin, yPosition, pageWidth - margin, yPosition);
  yPosition += 15;

  // Job Duties and Responsibilities section (left aligned)
  yPosition = addSection(
    pdf,
    yPosition,
    "Job Duties and Responsibilities",
    [
      "Review and process online form submissions for completeness and accuracy.",
      "Maintain digital records and organize processed forms for easy retrieval.",
      "Enter, update, and verify data in company databases or CRM systems.",
      "Ensure timely processing to meet deadlines and service-level agreements (SLAs).",
      "Use data entry software and online tools efficiently while maintaining a high level of accuracy.",
      "Identify and correct errors or inconsistencies in submitted forms.",
      "Communicate with customers or clients via email/chat to clarify missing or incorrect information.",
    ],
    margin,
    pageWidth,
    pageHeight,
    true
  );

  // Benefits section (left aligned)
  yPosition = addSection(
    pdf,
    yPosition,
    "Benefits",
    [
      "Fully remote opportunity",
      "Paid Time Off (Vacation, Sick Leave & Public Holidays)",
      "Training & Development programs",
      "Family Leave (Maternity, Paternity)",
      "Health, dental, and vision insurance",
      "Sign-up Bonus (All qualified candidates are entitled to these benefits)",
    ],
    margin,
    pageWidth,
    pageHeight,
    true
  );

  // Next Steps section (left aligned)
  yPosition = addSection(
    pdf,
    yPosition,
    "Next Steps",
    [
      `Your expected training start date is ${confirmationData.trainingDate}, or after providing two weeks' notice to your current employer.`,
      "",
      "To proceed, please provide the following information for documentation and filing in our company database as soon as possible:",
      "",
      "- Full Name",
      "- Full Home Address",
      "- Preferred Cell Number",
      "- Preferred Email Address",
      "",
      "We look forward to having you on our team. Congratulations once again!",
    ],
    margin,
    pageWidth,
    pageHeight,
    true
  );

  // Signature section (left aligned)
  if (yPosition > pageHeight - 50) {
    pdf.addPage();
    addFooterVectors(pdf, pageWidth, pageHeight);
    yPosition = 20;
  }

  yPosition += 20;
  pdf.text("Sincerely,", margin, yPosition);
  yPosition += 15;

  pdf.setFont("helvetica", "bold");
  pdf.text("HIRING DEPARTMENT", margin, yPosition);
  yPosition += 5;
  pdf.setFont("helvetica", "normal");
  pdf.text("Apex Focus Group", margin, yPosition);

  pdf.save(
    `job-confirmation-${confirmationData.employeeName.replace(/\s+/g, "-")}.pdf`
  );
};
