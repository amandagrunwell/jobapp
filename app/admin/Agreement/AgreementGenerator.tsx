"use client";
import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import CustomDatePicker from "@/app/components/CustomDatePicker";
import { generatePDF } from "./agreementGen";

export interface AgreementData {
  employeeName: string;
  date: string;
  logoUrl: string;
  position: string;
  startDate: string;
  hourlyRate: string;
}

const AgreementGenerator: React.FC = () => {
  const [agreementData, setAgreementData] = useState<AgreementData>({
    employeeName: "",
    date: new Date().toISOString().split("T")[0],
    logoUrl: "/logo 1.png",
    position: "Data entry clerk",
    startDate: new Date().toISOString().split("T")[0],
    hourlyRate: "29.90",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAgreementData((prev) => ({
      ...prev,
      [name]: value,
    }));
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

    setAgreementData((prev) => ({
      ...prev,
      [name]: formattedDate,
    }));
  };

  // const formatDateForPDF = (dateString: string): string => {
  //   if (!dateString || dateString.length !== 10) return "Invalid Date";

  //   const [year, month, day] = dateString.split("-").map(Number);
  //   const monthNames = [
  //     "January",
  //     "February",
  //     "March",
  //     "April",
  //     "May",
  //     "June",
  //     "July",
  //     "August",
  //     "September",
  //     "October",
  //     "November",
  //     "December",
  //   ];

  //   if (month < 1 || month > 12 || day < 1 || day > 31) {
  //     return "Invalid Date";
  //   }

  //   return `${monthNames[month - 1]} ${day}, ${year}`;
  // };

  useEffect(() => {
    console.log("agreementData updated:", agreementData);
  }, [agreementData]);

  return (
    <div className="container mx-auto  max-w-2xl mt-2">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Appointment Agreement Generator
      </h1>

      <div className="bg-black p-6 rounded-lg shadow-md border">
        <h2 className="text-xl font-semibold mb-4">Customize Agreement</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Employee Name
            </label>
            <input
              type="text"
              name="employeeName"
              value={agreementData.employeeName}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg"
              placeholder="Enter employee name"
            />
          </div>
          <div className="flex md:flex-row  justify-between">
            <div>
              <label className="block text-sm font-medium mb-2">
                Agreement Date
              </label>
              <CustomDatePicker
                name="date"
                value={agreementData.date}
                onChange={handleDateChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Start Date
              </label>
              <CustomDatePicker
                name="startDate"
                value={agreementData.startDate}
                onChange={handleDateChange}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Position</label>
            <input
              type="text"
              name="position"
              value={agreementData.position}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg"
              placeholder="Enter position"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Hourly Rate ($)
            </label>
            <input
              type="text"
              name="hourlyRate"
              value={agreementData.hourlyRate}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg"
              placeholder="29.90"
            />
          </div>
        </div>

        <button
          onClick={() => generatePDF}
          className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold mt-6"
        >
          Generate Appointment Agreement PDF
        </button>
      </div>
    </div>
  );
};

export default AgreementGenerator;
