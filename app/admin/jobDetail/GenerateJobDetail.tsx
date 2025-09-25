"use client";
import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import { generatePDF } from "./generator";

export interface JobDetailsData {
  logoUrl: string;
  position: string;
  regularPay: string;
  trainingPay: string;
  fullTimeHours: string;
  partTimeHours: string;
  paidTimeOff: string;
  equipmentDetails: string;
  trainingDuration: string;
  hrManagerName: string;
}

const JobDetailsGenerator: React.FC = () => {
  const [jobDetailsData, setJobDetailsData] = useState<JobDetailsData>({
    logoUrl: "/logo 1.png",
    position: "Remote Data Entry Specialist",
    regularPay: "29.79",
    trainingPay: "25.51",
    fullTimeHours: "9:00 AM – 5:00 PM, Monday to Friday (40 hours/week)",
    partTimeHours:
      "Flexible schedule between 9:00 AM and 10:00 PM (minimum 20 hours/week)",
    paidTimeOff: "21",
    equipmentDetails: "Apple MacBook Pro or iMac",
    trainingDuration: "two weeks",
    hrManagerName: "Devan Kunz",
  });

  const [logoFile, setLogoFile] = useState<File | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setJobDetailsData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //   const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     const file = e.target.files?.[0];
  //     if (file && file.type.startsWith("image/")) {
  //       setLogoFile(file);
  //       const reader = new FileReader();
  //       reader.onload = (event) => {
  //         setJobDetailsData((prev) => ({
  //           ...prev,
  //           logoUrl: event.target?.result as string,
  //         }));
  //       };
  //       reader.readAsDataURL(file);
  //     }
  //   };

  // Function to add professional footer vectors

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Job Details Document Generator
      </h1>

      <div className="bg-black p-6 rounded-lg shadow-md border">
        <h2 className="text-xl font-semibold mb-4">
          Customize Job Details Document
        </h2>

        <div className="space-y-4">
          {/* <div>
            <label className="block text-sm font-medium mb-2">
              Company Logo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              className="w-full p-3 border rounded-lg"
            />
            <p className="text-sm text-gray-500 mt-1">
              Upload your company logo (optional)
            </p>
          </div> */}

          <div>
            <label className="block text-sm font-medium mb-2">
              Position Title
            </label>
            <input
              type="text"
              name="position"
              value={jobDetailsData.position}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg"
              placeholder="e.g., Remote Data Entry Specialist"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Regular Pay Rate ($/hr)
              </label>
              <input
                type="text"
                name="regularPay"
                value={jobDetailsData.regularPay}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg"
                placeholder="29.79"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Training Pay Rate ($/hr)
              </label>
              <input
                type="text"
                name="trainingPay"
                value={jobDetailsData.trainingPay}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg"
                placeholder="25.51"
              />
            </div>
          </div>

          {/* <div>
            <label className="block text-sm font-medium mb-2">
              Full-Time Hours Description
            </label>
            <input
              type="text"
              name="fullTimeHours"
              value={jobDetailsData.fullTimeHours}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg"
              placeholder="e.g., 9:00 AM – 5:00 PM, Monday to Friday (40 hours/week)"
            />
          </div> */}

          {/* <div>
            <label className="block text-sm font-medium mb-2">
              Part-Time Hours Description
            </label>
            <input
              type="text"
              name="partTimeHours"
              value={jobDetailsData.partTimeHours}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg"
              placeholder="e.g., Flexible schedule between 9:00 AM and 10:00 PM (minimum 20 hours/week)"
            />
          </div> */}

          {/* <div>
            <label className="block text-sm font-medium mb-2">
              Paid Time Off (Days)
            </label>
            <input
              type="text"
              name="paidTimeOff"
              value={jobDetailsData.paidTimeOff}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg"
              placeholder="21"
            />
          </div> */}

          {/* <div>
            <label className="block text-sm font-medium mb-2">
              Equipment Details
            </label>
            <input
              type="text"
              name="equipmentDetails"
              value={jobDetailsData.equipmentDetails}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg"
              placeholder="e.g., Apple MacBook Pro or iMac"
            />
          </div> */}

          {/* <div>
            <label className="block text-sm font-medium mb-2">
              Training Duration
            </label>
            <input
              type="text"
              name="trainingDuration"
              value={jobDetailsData.trainingDuration}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg"
              placeholder="e.g., two weeks"
            />
          </div> */}

          {/* <div>
            <label className="block text-sm font-medium mb-2">
              HR Manager Name
            </label>
            <input
              type="text"
              name="hrManagerName"
              value={jobDetailsData.hrManagerName}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg"
              placeholder="e.g., Devan Kunz"
            />
          </div> */}
        </div>

        <button
          onClick={() => generatePDF(jobDetailsData)}
          className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold mt-6"
        >
          Generate Job Details PDF
        </button>
      </div>
    </div>
  );
};

export default JobDetailsGenerator;
