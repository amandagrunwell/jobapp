"use client";
import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import CustomDatePicker from "@/app/components/CustomDatePicker";
import GeneratePdfView from "../GeneratePdfView";
import { generatePDF } from "./confirmGenerator";

export interface ConfirmationData {
  employeeName: string;
  date: string;
  logoUrl: string;
  position: string;
  startDate: string;
  hourlyRate: string;
  supervisorName: string;
  trainingDate: string;
  fullAddress: string;
  phoneNumber: string;
  email: string;
}

const ConfirmationLetterGenerator: React.FC = () => {
  const [confirmationData, setConfirmationData] = useState<ConfirmationData>({
    employeeName: "",
    date: new Date().toISOString().split("T")[0],
    logoUrl: "/logo 1.png",
    position: "Data Entry Clerk",
    startDate: new Date().toISOString().split("T")[0],
    hourlyRate: "29.79",
    supervisorName: "Devan Kunz",
    trainingDate: "October 06, 2025",
    fullAddress: "",
    phoneNumber: "",
    email: "",
  });

  const [logoFile, setLogoFile] = useState<File | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setConfirmationData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setConfirmationData((prev) => ({
          ...prev,
          logoUrl: event.target?.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to add professional footer vectors

  const handleDateChange = (date: Date | null, name: string) => {
    if (!date) return;

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}`;

    setConfirmationData((prev) => ({
      ...prev,
      [name]: formattedDate,
    }));
  };

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Job Confirmation Letter Generator
      </h1>

      <div className="bg-black p-6 rounded-lg shadow-md border">
        <h2 className="text-xl font-semibold mb-4">
          Customize Confirmation Letter
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Employee Full Name
            </label>
            <input
              type="text"
              name="employeeName"
              value={confirmationData.employeeName}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg"
              placeholder="Enter employee full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Letter Date
            </label>
            <CustomDatePicker
              name="date"
              value={confirmationData.date}
              onChange={handleDateChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Position</label>
            <input
              type="text"
              name="position"
              value={confirmationData.position}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg"
              placeholder="Enter position title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Hourly Rate ($)
            </label>
            <input
              type="text"
              name="hourlyRate"
              value={confirmationData.hourlyRate}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg"
              placeholder="29.79"
            />
          </div>

          {/* <div>
            <label className="block text-sm font-medium mb-2">
              Supervisor's Name
            </label>
            <input
              type="text"
              name="supervisorName"
              value={confirmationData.supervisorName}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg"
              placeholder="Enter supervisor name"
            />
          </div> */}

          <div>
            <label className="block text-sm font-medium mb-2">
              Training Start Date
            </label>
            <input
              type="text"
              name="trainingDate"
              value={confirmationData.trainingDate}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg"
              placeholder="e.g., October 06, 2025"
            />
          </div>

          {/* <div>
            <label className="block text-sm font-medium mb-2">
              Employee Address
            </label>
            <textarea
              name="fullAddress"
              value={confirmationData.fullAddress}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg"
              placeholder="Enter full home address"
              rows={3}
            />
          </div> */}

          {/* <div>
            <label className="block text-sm font-medium mb-2">
              Phone Number
            </label>
            <input
              type="text"
              name="phoneNumber"
              value={confirmationData.phoneNumber}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg"
              placeholder="Enter preferred phone number"
            />
          </div> */}

          {/* <div>
            <label className="block text-sm font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={confirmationData.email}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg"
              placeholder="Enter email address"
            />
          </div> */}
        </div>

        <button
          onClick={() => generatePDF(confirmationData)}
          className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold mt-6"
        >
          Generate Job Confirmation PDF
        </button>

        {/* <div className="mt-4 p-4 bg-green-50 rounded-lg">
          <p className="text-sm text-green-800">
            This generator will create a professional job confirmation letter
            PDF with proper left alignment and text wrapping within margins.
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default ConfirmationLetterGenerator;
