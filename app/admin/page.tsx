"use client";

import React, { ChangeEvent, JSX, useEffect, useMemo, useState } from "react";

import Admin from "./Admin";
import GeneratePdfView from "./GeneratePdfView";

import Main from "./IdmeAndBackground/Main";

export default function AdminDashboard(): React.ReactElement {
  type ViewKey = "applicants" | "pdf" | "idme";

  const views: Record<ViewKey, JSX.Element> = {
    pdf: <GeneratePdfView />,
    applicants: <Admin />,
    idme: <Main />,
  };

  const [view, setView] = useState<ViewKey>("idme");
  function handleSelect(e: ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value as ViewKey;
    if (value in views) setView(value);
    else setView("pdf"); // fallback for unknown value
  }
  return (
    <>
      <div className="max-w-8xl p-5 bg-gray-900">
        <div className="p-2 border-gray-200 flex flex-col space-y-2 my-5">
          <label htmlFor="generate" className="text-xl">
            Select View
          </label>
          <select
            id="generate"
            onChange={handleSelect}
            className="border rounded-4xl p-2 bg-gray-900 text-xl"
          >
            <option value="">Select a View</option>
            <option value="applicants">Applicants View</option>
            <option value="pdf">Generate Pdf View</option>
            <option value="idme">IDME and Background Pdf View</option>
          </select>
        </div>
      </div>
      {views[view]}
    </>
  );
}
