import jsPDF from "jspdf";
import { AgreementData } from "./AgreementGenerator";
const addFooterVectors = (
  pdf: jsPDF,
  pageWidth: number,
  pageHeight: number
) => {
  const primaryColor = "#4F46E5"; // Indigo color

  // Save current graphics state
  pdf.saveGraphicsState();

  // Footer wave pattern
  pdf.setFillColor(primaryColor);
  pdf.setDrawColor(primaryColor);

  // Wave pattern at the bottom
  const waveHeight = 15;
  const waveStartY = pageHeight - waveHeight;

  // Create wave pattern using bezier curves
  pdf.setLineWidth(0.5);

  // Main wave line
  pdf.setDrawColor(primaryColor);
  pdf.setLineWidth(1);
  pdf.line(0, waveStartY, pageWidth, waveStartY);

  // Decorative circles pattern
  // const circleRadius = 2;
  // const circleSpacing = 15;
  // for (let x = circleSpacing; x < pageWidth; x += circleSpacing) {
  //   pdf.setFillColor(primaryColor);
  //   pdf.circle(x, waveStartY - 8, circleRadius, "F");
  // }

  // Corner accents
  const cornerSize = 20;

  // Bottom left corner design
  pdf.setFillColor(primaryColor);
  pdf.setGState(new (pdf as any).GState({ opacity: 0.1 }));
  pdf.rect(0, waveStartY - cornerSize, cornerSize, cornerSize, "F");

  // Bottom right corner design
  pdf.rect(
    pageWidth - cornerSize,
    waveStartY - cornerSize,
    cornerSize,
    cornerSize,
    "F"
  );

  // Reset opacity
  pdf.setGState(new (pdf as any).GState({ opacity: 1.0 }));

  // Geometric patterns on sides
  const sidePatternWidth = 8;

  // Left side pattern - triangles
  for (let y = waveStartY - 30; y > 50; y -= 12) {
    pdf.setFillColor(primaryColor);
    pdf.setGState(new (pdf as any).GState({ opacity: 0.15 }));
    pdf.triangle(0, y, sidePatternWidth, y - 4, 0, y - 8, "F");
  }

  // Right side pattern - triangles (mirrored)
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

  // Reset opacity
  pdf.setGState(new (pdf as any).GState({ opacity: 1.0 }));

  // Page number and footer text
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(8);
  pdf.setTextColor(79, 70, 229); // #4F46E5 in RGB
  pdf.text(`Apex Focus Group - Confidential`, pageWidth / 2, pageHeight - 5, {
    align: "center",
  });

  // Restore graphics state
  pdf.restoreGraphicsState();
};
const addSection = (
  pdf: jsPDF,
  yPosition: number,
  title: string,
  content: string[],
  margin: number,
  pageWidth: number,
  pageHeight: number
) => {
  let currentY = yPosition;

  // Section title
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(11);
  pdf.text(title, margin, currentY);
  currentY += 5;

  // Section content
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);

  content.forEach((line) => {
    const lines = pdf.splitTextToSize(line, pageWidth - 2 * margin);
    lines.forEach((textLine: string) => {
      if (currentY > pageHeight - 40) {
        // Leave space for footer
        pdf.addPage();
        // Add footer vectors to new page
        addFooterVectors(pdf, pageWidth, pageHeight);
        currentY = 20;
      }
      pdf.text(textLine, margin + 5, currentY);
      currentY += 5;
    });
    currentY += 2;
  });

  return currentY + 5;
};
export const generatePDF = (agreementData: AgreementData) => {
  const pdf = new jsPDF("p", "mm", "a4");
  const margin = 20;
  const logoWidth = 70;
  const logoHeight = 15;
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  let yPosition = 20;

  // Add footer vectors to first page
  addFooterVectors(pdf, pageWidth, pageHeight);

  // Header with logo
  if (agreementData.logoUrl) {
    const x = (pageWidth - logoWidth) / 2;
    try {
      pdf.addImage(agreementData.logoUrl, "PNG", x, 10, logoWidth, logoHeight);
    } catch (error) {
      console.log("Error adding header logo, continuing without it", error);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(12);
      pdf.text("APEXFOCUSGROUP", pageWidth / 2, 20, { align: "center" });
    }
  }

  yPosition += 25;

  // Document title
  pdf.setFontSize(14);
  pdf.text("LETTER OF APPOINTMENT AND AGREEMENT", pageWidth / 2, yPosition, {
    align: "center",
  });
  yPosition += 15;

  // Date
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(10);
  const formattedDate = formatDateForPDF(agreementData.date);
  pdf.text(formattedDate, pageWidth - margin, yPosition, {
    align: "right",
  });
  yPosition += 10;

  // Salutation
  pdf.text(`Dear ${agreementData.employeeName},`, margin, yPosition);
  pdf.setFont("helvetica", "normal");
  yPosition += 8;

  // Introduction
  const formattedStartDate = formatDateForPDF(agreementData.startDate);
  const introText = `We refer to your recent interview for the ${agreementData.position} and we are pleased to offer you the role with our company effective ${formattedStartDate}, under the following terms and conditions:`;
  const introLines = pdf.splitTextToSize(introText, pageWidth - 2 * margin);
  introLines.forEach((line: string) => {
    if (yPosition > pageHeight - 40) {
      pdf.addPage();
      addFooterVectors(pdf, pageWidth, pageHeight);
      yPosition = 20;
    }
    pdf.text(line, margin, yPosition);
    yPosition += 5;
  });
  yPosition += 10;

  // All sections with footer support
  yPosition = addSection(
    pdf,
    yPosition,
    "1. SALARY",
    [`Your starting salary is $${agreementData.hourlyRate} per hour.`],
    margin,
    pageWidth,
    pageHeight
  );

  yPosition = addSection(
    pdf,
    yPosition,
    "2. TRAINING",
    [
      "Your appointment will be subject to a paid training period of 2 weeks and a probationary period of 8 weeks.",
    ],
    margin,
    pageWidth,
    pageHeight
  );

  yPosition = addSection(
    pdf,
    yPosition,
    "3. WORKING HOURS",
    [
      "Your working hours will be as follows:",
      "- Part-time, Monday to Friday, between 9:00 AM and 10:00 PM flexible hours",
      "- Break time: Pending on morning, afternoon or evening session",
      "",
      "You will be informed if you are required to work extra or irregular hours and will have the option to accept or decline. Appropriate time off will be considered for work performed outside normal operational hours.",
    ],
    margin,
    pageWidth,
    pageHeight
  );

  yPosition = addSection(
    pdf,
    yPosition,
    "4. LEAVE OF ABSENCE",
    [
      "Leave of absence, whether medical or annual, will be granted in accordance with the Company's Employee Handbook. Leave applications must be made one week in advance.",
    ],
    margin,
    pageWidth,
    pageHeight
  );

  yPosition = addSection(
    pdf,
    yPosition,
    "4.1 ANNUAL LEAVE",
    [
      "Annual leave is as follows:",
      "- Employed for 1–3 years: 13 days",
      "- Employed for 4–5 years: 25 days",
      "- Employed for more than 5 years: 40 days",
      "The maximum leave will be capped at 60 days. Leave will be taken at interval periods, unless requested for special reasons such as an overseas trip.",
      "No leave will be granted immediately before or after public holidays.",
      "Employees may carry forward a maximum of 7 working days of unutilized leave to the following year, which must be used by year-end.",
    ],
    margin,
    pageWidth,
    pageHeight
  );

  yPosition = addSection(
    pdf,
    yPosition,
    "4.2 MARRIAGE LEAVE",
    ["Permanent employees are entitled to 2 days of Marriage Leave."],
    margin,
    pageWidth,
    pageHeight
  );

  yPosition = addSection(
    pdf,
    yPosition,
    "4.3 COMPASSIONATE LEAVE",
    [
      "Permanent employees are entitled to:",
      "- 3 days: Death of spouse, child, or parent",
      "- 2 days: Death of parent-in-law, sibling, or grandparent",
    ],
    margin,
    pageWidth,
    pageHeight
  );

  yPosition = addSection(
    pdf,
    yPosition,
    "5. BONUS",
    [
      "Bonuses are dependent on the company's profitability and your performance. They are only payable at the end of each month.",
    ],
    margin,
    pageWidth,
    pageHeight
  );

  yPosition = addSection(
    pdf,
    yPosition,
    "6. 401k",
    [
      "Employee and employer contributions to your 401k will be deducted in accordance with the ordinance currently in effect.",
    ],
    margin,
    pageWidth,
    pageHeight
  );

  yPosition = addSection(
    pdf,
    yPosition,
    "7. NOTICE PERIOD FOR TERMINATION",
    [
      "The notice period for termination of employment or salary in lieu shall be as follows:",
      "- First month of probation: No notice required",
      "- Second month until end of probation: 7 days' notice",
      "- After probation: 1 month's notice",
      "Leave cannot be used as resignation notice.",
    ],
    margin,
    pageWidth,
    pageHeight
  );

  yPosition = addSection(
    pdf,
    yPosition,
    "8. FRINGE BENEFITS",
    [
      "Upon successful completion of the probation period, you will become a permanent employee and be entitled to the fringe benefits as outlined in the Employee Handbook, which will be sent to you by mail.",
      "You are expected to serve the company with loyalty and honesty and to follow all instructions given to you by your supervisors.",
    ],
    margin,
    pageWidth,
    pageHeight
  );

  yPosition = addSection(
    pdf,
    yPosition,
    "9. CONFIDENTIALITY",
    [
      "You shall not, during or after your employment, reveal any of the company's affairs or trade secrets to anyone, nor use any confidential information acquired during your employment for personal gain or to the company's detriment.",
    ],
    margin,
    pageWidth,
    pageHeight
  );

  yPosition = addSection(
    pdf,
    yPosition,
    "10. RESIGNATION / TERMINATION",
    [
      "The Company reserves the right to summarily terminate your employment under the following circumstances:",
      "- Misconduct",
      "- Negligence in duty",
      "- Refusal to be examined by a medical practitioner nominated by the company when claiming illness or failing to provide necessary health information",
      "",
      "Upon termination of your employment, you agree not to:",
      "- Work in or associate with any business like Apex Focus Group within the United States for 12 months",
      "- Solicit or interfere with any of the company's customers",
      "- Use or disclose any business information or contacts obtained during your employment",
      "",
      "All company property and documents must be returned upon resignation or termination. All such materials are the property of the company.",
    ],
    margin,
    pageWidth,
    pageHeight
  );

  // Signature section
  if (yPosition > pageHeight - 80) {
    pdf.addPage();
    addFooterVectors(pdf, pageWidth, pageHeight);
    yPosition = 20;
  }

  yPosition += 10;
  pdf.text(
    "If you accept the terms of this appointment, please sign and return the duplicate copy of this letter.",
    margin,
    yPosition
  );
  yPosition += 15;

  pdf.text("Sincerely,", margin, yPosition);
  yPosition += 15;

  pdf.setFont("helvetica", "bold");
  pdf.text("Stephen Brandt", margin, yPosition);
  yPosition += 5;
  pdf.setFont("helvetica", "normal");
  pdf.text("Head of HR", margin, yPosition);
  yPosition += 5;
  pdf.text("Apex Focus Group", margin, yPosition);
  yPosition += 20;

  // Employee acknowledgment
  pdf.setFont("helvetica", "bold");
  pdf.text("Employee Acknowledgment", margin, yPosition);
  yPosition += 8;
  pdf.setFont("helvetica", "normal");
  pdf.text(
    "I agree to the appointment and accept the above terms and conditions of service.",
    margin,
    yPosition
  );
  yPosition += 15;

  pdf.text("Employee Signature: _________________________", margin, yPosition);
  yPosition += 5;
  pdf.text(`Name: ${agreementData.employeeName}`, margin, yPosition);
  yPosition += 5;
  pdf.text(`Date: ${formattedDate}`, margin, yPosition);
  yPosition += 5;
  pdf.text("HR Signature: _________________________", margin, yPosition);

  pdf.save(
    `appointment-agreement-${agreementData.employeeName.replace(
      /\s+/g,
      "-"
    )}.pdf`
  );
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
