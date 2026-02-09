// components/InfoForm.tsx
"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useInfoStore } from "../stores/infoStore";
import { InfoInput } from "../types";
import { extractDomainFromEmail, normalizeDomain } from "../utils/emailUtils";

const InfoForm = () => {
  const {
    infoList,
    isLoading,
    fetchInfo,
    addInfo,
    checkDuplicate,
    checkDomainExists,
    lastLocation,
  } = useInfoStore();

  // Initialize form with last location from store
  const [formData, setFormData] = useState<InfoInput>(() => ({
    cfoEmail: "",
    ceoName: "",
    ceoEmail: "",
    domain: "",
    location: (lastLocation as "US" | "Au" | "Ca") || "US",
  }));

  const [domainChecked, setDomainChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchInfo();
  }, [fetchInfo]);

  // Automatically check domain whenever domain value changes
  const domainCheckResult = useMemo(() => {
    if (!formData.domain || formData.domain.trim() === "") {
      setDomainChecked(false);
      return { exists: false, matchingInfo: null };
    }

    const normalizedDomain = normalizeDomain(formData.domain);
    const result = checkDomainExists(normalizedDomain);
    setDomainChecked(true); // Mark as checked when we have a domain
    return result;
  }, [formData.domain, checkDomainExists, infoList]);

  const domainExists = domainCheckResult.exists;
  const matchingInfo = domainCheckResult.matchingInfo;

  const handleCfoEmailChange = (value: string) => {
    setFormData((prev) => {
      const newData = { ...prev, cfoEmail: value };

      const extractedDomain = extractDomainFromEmail(value);
      if (extractedDomain) {
        newData.domain = extractedDomain;
      }

      return newData;
    });
  };

  const handleDomainChange = (value: string) => {
    setFormData((prev) => ({ ...prev, domain: value }));
    // Domain will be automatically checked in the useMemo above
  };

  const handleLocationChange = (value: "US" | "Au" | "Ca") => {
    setFormData((prev) => ({ ...prev, location: value }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    if (name === "cfoEmail") {
      handleCfoEmailChange(value);
    } else if (name === "domain") {
      handleDomainChange(value);
    } else if (name === "location") {
      handleLocationChange(value as "US" | "Au" | "Ca");
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate location is one of the allowed values
    const validLocations: ("US" | "Au" | "Ca")[] = ["US", "Au", "Ca"];
    if (!validLocations.includes(formData.location)) {
      alert("Please select a valid location (US, Au, or Ca)");
      return;
    }

    // Check if domain is empty
    if (!formData.domain || formData.domain.trim() === "") {
      alert("Please enter a domain");
      return;
    }

    // Check if domain has been checked (it should be automatic now)
    if (!domainChecked) {
      alert("Please wait while the domain is being checked");
      return;
    }

    // Check if domain exists
    if (domainExists) {
      alert("Cannot submit: Domain already exists in the system");
      return;
    }

    // Check for duplicate CFO email
    if (checkDuplicate(formData.cfoEmail)) {
      alert("Duplicate CFO email detected! Please use a different email.");
      return;
    }

    setLoading(true);

    // Create properly typed input object
    const infoInput: InfoInput = {
      cfoEmail: formData.cfoEmail,
      ceoName: formData.ceoName,
      ceoEmail: formData.ceoEmail,
      domain: formData.domain,
      location: formData.location,
    };

    const result = await addInfo(infoInput);

    if (result.success) {
      // Clear all fields except location
      setFormData({
        cfoEmail: "",
        ceoName: "",
        ceoEmail: "",
        domain: "",
        location: formData.location, // Keep current location
      });
      setDomainChecked(false);
    } else {
      alert(result.message);
    }

    setLoading(false);
  };

  const isFormDisabled = domainExists || isLoading;

  // Calculate domain status - now simpler since checking is automatic
  const domainStatus = useMemo(() => {
    if (!formData.domain || formData.domain.trim() === "") return "empty";
    if (!domainChecked) return "checking"; // Briefly shows "checking" state
    return domainExists ? "exists" : "available";
  }, [formData.domain, domainChecked, domainExists]);

  // Location options
  const locationOptions = [
    { value: "US", label: "United States (US)", flag: "🇺🇸" },
    { value: "Au", label: "Australia (Au)", flag: "🇦🇺" },
    { value: "Ca", label: "Canada (Ca)", flag: "🇨🇦" },
  ];

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-900 rounded-xl shadow-2xl border border-gray-800">
      <h2 className="text-2xl font-bold mb-6 text-white">
        Add Company Information
      </h2>

      {isLoading && (
        <div className="mb-4 p-3 bg-blue-900/30 border border-blue-800/50 rounded-lg">
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-400 mr-3"></div>
            <p className="text-blue-300">Loading company data...</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Location Field */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Location *
          </label>
          <div className="relative">
            <select
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              disabled={isFormDisabled}
              className={`w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none ${
                isFormDisabled
                  ? "bg-gray-800/50 cursor-not-allowed text-gray-500"
                  : "bg-gray-800 hover:bg-gray-750 text-white"
              } border border-gray-700 pr-10`}
            >
              {locationOptions.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  className="bg-gray-800 text-white"
                >
                  {option.flag} {option.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
          <p className="mt-1 text-xs text-gray-400">
            Location persists after submission
          </p>
        </div>

        {/* Domain Field */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Domain *
          </label>
          <input
            type="text"
            name="domain"
            value={formData.domain}
            onChange={handleChange}
            required
            disabled={isLoading}
            className={`flex-1 w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
              isLoading
                ? "bg-gray-800 cursor-not-allowed"
                : "bg-gray-800 hover:bg-gray-750"
            } ${
              domainStatus === "exists"
                ? "border-2 border-red-500 bg-red-900/20 text-red-300"
                : domainStatus === "available"
                  ? "border-2 border-emerald-500 bg-emerald-900/10 text-emerald-300"
                  : domainStatus === "checking"
                    ? "border-2 border-amber-500 bg-amber-900/10 text-amber-300"
                    : "border border-gray-700 text-white"
            }`}
            placeholder="example.com"
          />

          <div className="mt-2 space-y-1">
            {domainStatus === "exists" && (
              <div className="p-3 bg-red-900/20 border border-red-800/50 rounded-lg">
                <div className="flex items-start">
                  <svg
                    className="w-5 h-5 text-red-400 mt-0.5 mr-2 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div>
                    <p className="text-red-300 font-medium">
                      Domain already exists!
                    </p>
                    {matchingInfo && (
                      <div className="text-red-400/80 text-sm mt-1">
                        <p className="font-semibold">
                          Found in existing record:
                        </p>
                        <p className="mt-1">CFO: {matchingInfo.cfo_email}</p>
                        <p>CEO: {matchingInfo.ceo_name}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {domainStatus === "available" && (
              <div className="p-3 bg-emerald-900/20 border border-emerald-800/50 rounded-lg">
                <div className="flex items-start">
                  <svg
                    className="w-5 h-5 text-emerald-400 mt-0.5 mr-2 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <div>
                    <p className="text-emerald-300 font-medium">
                      ✓ Domain is available
                    </p>
                    <p className="text-emerald-400/80 text-sm mt-1">
                      This domain can be used
                    </p>
                  </div>
                </div>
              </div>
            )}

            {domainStatus === "checking" && formData.domain && (
              <div className="p-3 bg-amber-900/20 border border-amber-800/50 rounded-lg">
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-amber-400 mr-3"></div>
                  <p className="text-amber-300">
                    Checking domain availability...
                  </p>
                </div>
              </div>
            )}

            {domainStatus === "empty" && (
              <div className="p-3 bg-gray-800/30 border border-gray-700 rounded-lg">
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-gray-400 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-gray-400">
                    Enter a domain to check availability
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* CEO Name Field */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            CEO Name *
          </label>
          <input
            type="text"
            name="ceoName"
            value={formData.ceoName}
            onChange={handleChange}
            required
            disabled={isFormDisabled}
            className={`w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isFormDisabled
                ? "bg-gray-800/50 cursor-not-allowed text-gray-500"
                : "bg-gray-800 hover:bg-gray-750 text-white"
            } border border-gray-700`}
            placeholder="John Doe"
          />
        </div>

        {/* CEO Email Field */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            CEO Email
          </label>
          <input
            type="email"
            name="ceoEmail"
            value={formData.ceoEmail}
            onChange={handleChange}
            disabled={isFormDisabled}
            className={`w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isFormDisabled
                ? "bg-gray-800/50 cursor-not-allowed text-gray-500"
                : "bg-gray-800 hover:bg-gray-750 text-white"
            } border border-gray-700`}
            placeholder="ceo@example.com"
          />
        </div>

        {/* CFO Email Field */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            CFO Email *
          </label>
          <input
            type="email"
            name="cfoEmail"
            value={formData.cfoEmail}
            onChange={handleChange}
            required
            disabled={isFormDisabled}
            className={`w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isFormDisabled
                ? "bg-gray-800/50 cursor-not-allowed text-gray-500"
                : "bg-gray-800 hover:bg-gray-750 text-white"
            } border border-gray-700`}
            placeholder="cfo@example.com"
          />
          <p className="mt-1 text-xs text-gray-400">
            Domain will be automatically extracted from this email
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={
            isFormDisabled || loading || !domainChecked || !formData.location
          }
          className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
            isFormDisabled || !domainChecked || !formData.location
              ? "bg-gray-700 text-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg hover:shadow-xl"
          }`}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
              Submitting...
            </div>
          ) : domainExists ? (
            <div className="flex items-center justify-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              Domain Exists - Cannot Submit
            </div>
          ) : !domainChecked ? (
            <div className="flex items-center justify-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Checking Domain...
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Submit Information
            </div>
          )}
        </button>
      </form>
    </div>
  );
};

export default InfoForm;
