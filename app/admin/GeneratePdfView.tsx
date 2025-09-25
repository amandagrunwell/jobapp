import { ChangeEvent, FC, JSX, useState } from "react";
import DefaultViewForPdf from "./DefaultViewForPdf";
import AgreementGenerator from "./Agreement/AgreementGenerator";
import ConfirmationLetterGenerator from "./confirmation/GenerateConfirm";
import JobDetailsGenerator from "./jobDetail/GenerateJobDetail";

type ViewKey = "default" | "confirm" | "agreement" | "jobDetail";

const GeneratePdfView: FC = () => {
  const views: Record<ViewKey, JSX.Element> = {
    default: <DefaultViewForPdf />,
    confirm: <ConfirmationLetterGenerator />,
    agreement: <AgreementGenerator />,
    jobDetail: <JobDetailsGenerator />,
  };

  const [view, setView] = useState<ViewKey>("default");

  function handleSelect(e: ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value as ViewKey;
    if (value in views) setView(value);
    else setView("default"); // fallback for unknown value
  }

  return (
    <div className="min-h-screen p-2 bg-gray-900 text-gray-200">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col p-10 space-y-2.5">
          <div className="p-2 border-gray-200 flex flex-col space-y-2">
            <label htmlFor="generate" className="text-xl">
              Select Tool
            </label>
            <select
              id="generate"
              onChange={handleSelect}
              className="border rounded-4xl p-2 bg-gray-900 text-xl"
            >
              <option value="">Select an option</option>
              <option value="confirm">Generate Confirmation Letter</option>
              <option value="agreement">Generate Appointment Letter</option>
              <option value="jobDetail">Generate Job Detail Letter</option>
            </select>
          </div>
          <hr />
          <div>{views[view]}</div>
        </div>
      </div>
    </div>
  );
};

export default GeneratePdfView;
