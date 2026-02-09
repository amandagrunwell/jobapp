// components/AvailableInfoPanel.tsx
"use client";

import React from "react";
import { useInfoStore } from "../stores/infoStore";
import { Info } from "../types";

const AvailableInfoPanel = () => {
  const { availableInfo, isLoading, infoList } = useInfoStore();

  const formatDate = (date: Date | undefined) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="p-6 bg-gray-900 rounded-xl border border-gray-800">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-800 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-800 rounded"></div>
            <div className="h-4 bg-gray-800 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
      <div className="p-6 border-b border-gray-800 bg-gray-900/50">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold text-white">
              Available Info Records
            </h3>
            <p className="text-sm text-gray-400 mt-1">
              Showing unsent records from 2026 onwards
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-900/30 text-blue-400 border border-blue-800/50">
              {availableInfo.length} available
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-800 text-gray-300 border border-gray-700">
              {infoList.length} total
            </span>
          </div>
        </div>
      </div>

      {availableInfo.length === 0 ? (
        <div className="p-8 text-center">
          <div className="text-gray-600 mb-3">
            <svg
              className="w-16 h-16 mx-auto opacity-50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
              />
            </svg>
          </div>
          <h4 className="text-lg font-medium text-white mb-1">
            No available records
          </h4>
          <p className="text-gray-400">
            All records are either sent or created before 2026
          </p>
        </div>
      ) : (
        <div className="divide-y divide-gray-800">
          {availableInfo.map((info: Info) => (
            <div
              key={info.id}
              className="p-6 hover:bg-gray-800/50 transition-colors group"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="text-md font-medium text-white group-hover:text-blue-300 transition-colors">
                    {info.ceo_name}
                  </h4>
                  <p className="text-sm text-gray-400 mt-1">
                    {info.organizationName || "No organization name"}
                  </p>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-900/30 text-emerald-400 border border-emerald-800/50">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-1.5 animate-pulse"></span>
                  Available
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">CFO Email</p>
                  <p className="font-medium text-gray-300 truncate">
                    {info.cfo_email}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">CEO Email</p>
                  <p className="font-medium text-gray-300">
                    {info.ceo_email || "Not provided"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Created</p>
                  <p className="font-medium text-blue-400">
                    {formatDate(info.createdAt)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Location</p>
                  <p className="font-medium text-gray-300">
                    {info.location || "Not specified"}
                  </p>
                </div>
              </div>

              {info.organizationWebsite && (
                <div className="mt-3">
                  <a
                    href={info.organizationWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                      />
                    </svg>
                    {info.organizationWebsite}
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AvailableInfoPanel;
