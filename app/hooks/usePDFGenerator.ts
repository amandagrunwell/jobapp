"use client";

import { useState } from "react";
import { EmployeeData } from "../envStore/types";

export const usePDFGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateAppointmentPDF = async (
    employeeData: EmployeeData
  ): Promise<Blob> => {
    setIsGenerating(true);
    setError(null);

    try {
      const { PDFDocument, rgb, StandardFonts } = await import("pdf-lib");

      // Create a new PDF document
      const pdfDoc = await PDFDocument.create();
      let currentPage = pdfDoc.addPage([595.28, 841.89]); // A4 size
      const { width, height } = currentPage.getSize();
      const margin = 50;
      let yPosition = height - margin;

      // --- Add logo ---
      const logoUrl = "/logo.png"; // <-- PNG instead of SVG
      const logoBytes = await fetch(logoUrl).then((res) => res.arrayBuffer());
      const logoImage = await pdfDoc.embedPng(logoBytes);

      const logoDims = logoImage.scale(0.25);
      const logoX = (width - logoDims.width) / 2;
      const logoY = height - margin - logoDims.height;

      currentPage.drawImage(logoImage, {
        x: logoX,
        y: logoY,
        width: logoDims.width,
        height: logoDims.height,
      });

      yPosition = logoY - 30;
      // Set up fonts
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

      // Helper function to add text
      const addText = (
        text: string,
        options: {
          x?: number;
          y?: number;
          size?: number;
          bold?: boolean;
          align?: "left" | "center" | "right";
        } = {}
      ) => {
        const x = options.x ?? margin;
        const y = options.y ?? yPosition;
        const size = options.size ?? 11;
        const bold = options.bold ?? false;

        // Handle text alignment
        let finalX = x;
        if (options.align === "center") {
          const textWidth = (bold ? boldFont : font).widthOfTextAtSize(
            text,
            size
          );
          finalX = (width - textWidth) / 2;
        } else if (options.align === "right") {
          const textWidth = (bold ? boldFont : font).widthOfTextAtSize(
            text,
            size
          );
          finalX = width - margin - textWidth;
        }

        currentPage.drawText(text, {
          x: finalX,
          y,
          size,
          font: bold ? boldFont : font,
          color: rgb(0, 0, 0),
          maxWidth: width - 2 * margin,
        });

        // Update yPosition if using default positioning
        if (!options.y) {
          const lines = Math.ceil((text.length * size) / (width - 2 * margin));
          yPosition -= lines * (size + 4);
        }
      };

      // Check if we need a new page
      const checkPageBreak = (linesNeeded: number = 1) => {
        const lineHeight = 20;
        const neededSpace = margin + linesNeeded * lineHeight;

        if (yPosition < neededSpace) {
          currentPage = pdfDoc.addPage([595.28, 841.89]);
          yPosition = height - margin;
          return true;
        }
        return false;
      };

      // Add section with title and content
      const addSection = (title: string, contentLines: string[]) => {
        checkPageBreak(2);
        addText(title, { bold: true, size: 12 });

        contentLines.forEach((line) => {
          checkPageBreak(1);
          addText(line);
        });

        yPosition -= 10; // Extra space after section
      };

      // ===== PAGE 1 CONTENT =====

      // Header
      addText("LETTER OF APPOINTMENT AND AGREEMENT", {
        bold: true,
        size: 16,
        align: "center",
        y: yPosition,
      });
      yPosition -= 40;

      // Date
      addText(employeeData.effectiveDate, {
        align: "right",
        y: yPosition,
      });
      yPosition -= 30;

      // Salutation
      addText(`Dear ${employeeData.employeeName},`);
      yPosition -= 20;

      // Introduction
      addText(
        `We refer to your recent interview for the ${employeeData.position} and we are pleased to offer you the role with our company effective ${employeeData.effectiveDate}, under the following terms and conditions:`
      );
      yPosition -= 30;

      // Section 1: SALARY
      addSection("1. SALARY", [
        `Your starting salary is $${employeeData.salary} per hour.`,
      ]);

      // Section 2: TRAINING
      addSection("2. TRAINING", [
        "Your appointment will be subject to a paid training period of 2 weeks and a probationary period of 8 weeks.",
      ]);

      // Section 3: WORKING HOURS
      addSection("3. WORKING HOURS", [
        "Your working hours will be as follows:",
        "• Part-time, Monday to Friday, between 9:00 AM and 10:00 PM flexible hours",
        "• Break time: Pending on morning, afternoon or evening session",
        "",
        "You will be informed if you are required to work extra or irregular hours and will have the option to accept or decline. Appropriate time off will be considered for work performed outside normal operational hours.",
      ]);

      // Section 4: LEAVE OF ABSENCE
      addSection("4. LEAVE OF ABSENCE", [
        "Leave of absence, whether medical or annual, will be granted in accordance with the Company's Employee Handbook. Leave applications must be made one week in advance.",
      ]);

      // Section 4.1: ANNUAL LEAVE
      addSection("4.1 ANNUAL LEAVE", [
        "Annual leave is as follows:",
        "• Employed for 1–3 years: 13 days",
        "• Employed for 4–5 years: 25 days",
        "• Employed for more than 5 years: 40 days",
        "",
        "The maximum leave will be capped at 60 days. Leave will be taken at interval periods, unless requested for special reasons such as an overseas trip.",
        "",
        "No leave will be granted immediately before or after public holidays.",
        "",
        "Employees may carry forward a maximum of 7 working days of unutilized leave to the following year, which must be used by year-end.",
      ]);

      // ===== PAGE 2 CONTENT =====
      checkPageBreak(10); // Force new page if needed

      // Section 4.2: MARRIAGE LEAVE
      addSection("4.2 MARRIAGE LEAVE", [
        "Permanent employees are entitled to 2 days of Marriage Leave.",
      ]);

      // Section 4.3: COMPASSIONATE LEAVE
      addSection("4.3 COMPASSIONATE LEAVE", [
        "Permanent employees are entitled to:",
        "• 3 days: Death of spouse, child, or parent",
        "• 2 days: Death of parent-in-law, sibling, or grandparent",
      ]);

      // Section 5: BONUS
      addSection("5. BONUS", [
        "Bonuses are dependent on the company's profitability and your performance. They are only payable at the end of each month.",
      ]);

      // Section 6: 401k
      addSection("6. 401k", [
        "Employee and employer contributions to your 401k will be deducted in accordance with the ordinance currently in effect.",
      ]);

      // Section 7: NOTICE PERIOD FOR TERMINATION
      addSection("7. NOTICE PERIOD FOR TERMINATION", [
        "The notice period for termination of employment or salary in lieu shall be as follows:",
        "• First month of probation: No notice required",
        "• Second month until end of probation: 7 days' notice",
        "• After probation: 1 month's notice",
        "",
        "Leave cannot be used as resignation notice.",
      ]);

      // Section 8: FRINGE BENEFITS
      addSection("8. FRINGE BENEFITS", [
        "Upon successful completion of the probation period, you will become a permanent employee and be entitled to the fringe benefits as outlined in the Employee Handbook, which will be sent to you by mail.",
        "",
        "You are expected to serve the company with loyalty and honesty and to follow all instructions given to you by your supervisors.",
      ]);

      // ===== PAGE 3 CONTENT =====
      checkPageBreak(10);

      // Section 9: CONFIDENTIALITY
      addSection("9. CONFIDENTIALITY", [
        "You shall not, during or after your employment, reveal any of the company's affairs or trade secrets to anyone, nor use any confidential information acquired during your employment for personal gain or to the company's detriment.",
      ]);

      // Section 10: RESIGNATION / TERMINATION
      addSection("10. RESIGNATION / TERMINATION", [
        "The Company reserves the right to summarily terminate your employment under the following circumstances:",
        "• Misconduct",
        "• Negligence in duty",
        "• Refusal to be examined by a medical practitioner nominated by the company when claiming illness or failing to provide necessary health information",
        "",
        "Upon termination of your employment, you agree not to:",
        "• Work in or associate with any business like Lifecycle Health within the United States for 12 months",
        "• Solicit or interfere with any of the company's customers",
        "• Use or disclose any business information or contacts obtained during your employment",
        "",
        "All company property and documents must be returned upon resignation or termination. All such materials are the property of the company.",
      ]);

      // Closing section
      checkPageBreak(5);
      addText(
        "If you accept the terms of this appointment, please sign and return the duplicate copy of this letter."
      );
      yPosition -= 40;

      addText("Sincerely,");
      yPosition -= 20;
      addText("Caleb Oneal");
      yPosition -= 15;
      addText("Head of HR");
      yPosition -= 15;
      addText("LIFECYCLE HEALTH");

      // ===== SIGNATURE PAGE =====
      currentPage = pdfDoc.addPage([595.28, 841.89]);
      yPosition = height - margin;

      // Employee Acknowledgment
      addText("Employee Acknowledgment", {
        bold: true,
        size: 14,
        align: "center",
        y: yPosition,
      });
      yPosition -= 60;

      addText(
        "I agree to the appointment and accept the above terms and conditions of service.",
        {
          align: "center",
          y: yPosition,
        }
      );
      yPosition -= 100;

      // Signature fields
      addText("Employee Signature: _________________________", {
        y: yPosition,
      });
      yPosition -= 40;
      addText("Name: _________________________", { y: yPosition });
      yPosition -= 40;
      addText("Date: _________________________", { y: yPosition });
      yPosition -= 40;
      addText("HR Signature: _________________________", { y: yPosition });

      // Generate PDF and create Blob
      const pdfBytes = await pdfDoc.save();

      // Fix for TypeScript compatibility
      return new Blob([pdfBytes as BlobPart], { type: "application/pdf" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate PDF");
      throw err;
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    generateAppointmentPDF,
    isGenerating,
    error,
  };
};
