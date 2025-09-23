"use client";
import React from "react";

const JobPostingTile = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-gray-200 rounded-lg shadow-sm p-0 mb-8 font-sans text-gray-800">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 rounded-t-lg">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">
          Remote Market Research Participant & Data Entry Clerk
        </h1>
        <p className="text-blue-100 text-lg">
          Flexible Hours - No Experience Needed - Earn Up To $750/Week
        </p>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* About Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-blue-700 mb-3 pb-2 border-b border-gray-200">
            About ApexFocus Group
          </h2>
          <p className="text-gray-700 leading-relaxed">
            ApexFocus Group is a leading market research firm dedicated to
            providing valuable insights to various industries through innovative
            research methodologies. We connect organizations with diverse
            participants to gather authentic feedback on products, services, and
            consumer trends.
          </p>
        </div>

        {/* Opportunity Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-blue-700 mb-3 pb-2 border-b border-gray-200">
            The Opportunity
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We&apos;re seeking motivated individuals to join our team as
            Part-Time Market Research Panelists and Data Entry Clerks.
            Participate in paid focus groups, clinical trials, and market
            research studies online or in-person. This role offers complete
            flexibility to work around your schedule.
          </p>
        </div>

        {/* Qualifications & Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Qualifications */}
          <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-blue-700 mb-3">
              Qualifications
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-green-500 mr-2 mt-1">•</span>
                <span>Must be located in United States</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2 mt-1">•</span>
                <span>
                  Smartphone with camera or desktop/laptop with webcam
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2 mt-1">•</span>
                <span>Reliable high-speed internet connection</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2 mt-1">•</span>
                <span>Ability to follow instructions carefully</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2 mt-1">•</span>
                <span>Must be at least 18 years old</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2 mt-1">•</span>
                <span>Strong communication skills</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2 mt-1">•</span>
                <span>No experience required</span>
              </li>
            </ul>
          </div>

          {/* Benefits */}
          <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-blue-700 mb-3">
              Benefits
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-green-500 mr-2 mt-1">•</span>
                <span>Earn up to $750 per week</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2 mt-1">•</span>
                <span>100% remote work option</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2 mt-1">•</span>
                <span>Flexible hours - no minimum commitment</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2 mt-1">•</span>
                <span>Receive free product samples</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2 mt-1">•</span>
                <span>Early access to new products</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2 mt-1">•</span>
                <span>Temporary, part-time or full-time options</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded">
          <h3 className="text-lg font-semibold text-blue-700 mb-2">
            Ready to get started?
          </h3>
          <p className="text-blue-800">
            Complete the form below to apply for this flexible opportunity.
            We&apos;re an equal opportunity employer that celebrates diversity
            and welcomes applicants from all backgrounds.
          </p>
        </div>
      </div>
    </div>
  );
};

export default JobPostingTile;
