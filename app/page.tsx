// app/dashboard/page.tsx
"use client";

import React from "react";
import { useAuthStore } from "./stores/authStore";
import InfoForm from "./components/InfoForm";

export default function DashboardPage() {
  const { user } = useAuthStore();

  return (
    <div className="p-4 md:p-8">
      <header className="mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-white"></h1>
            <p className="text-gray-400 mt-2">
              Manage company information and track available records
            </p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Form */}
        <div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-white mb-2">
              Add New Company
            </h2>
            <p className="text-gray-400">
              Enter company details. The system will check for duplicate
              domains.
            </p>
          </div>
          <InfoForm />
        </div>

        {/* Right Column - Available Info */}
        <div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-white mb-2">
              Available Records
            </h2>
            <p className="text-gray-400">
              Unsent records created in 2026 or later. These are ready for
              processing.
            </p>
          </div>
          {/* <AvailableInfoPanel /> */}
        </div>
      </div>
    </div>
  );
}
