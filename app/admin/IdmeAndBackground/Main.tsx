import { ChangeEvent, FC, JSX, useState } from "react";
import Idme from "./Idme";
import Background from "./Background";

interface MainProps {}
type ViewKey = "idme" | "background" | "default";
const Main: FC<MainProps> = ({}) => {
  const views: Record<ViewKey, JSX.Element> = {
    idme: <Idme />,
    background: <Background />,
    default: (
      <div className="mx-auto flex items-center justify-center text-2xl h-96">
        No Tool Selected Yet
      </div>
    ),
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
              <option value="default">Select an option</option>
              <option value="idme">Send Idme form</option>
              <option value="background">
                Send Background information Form
              </option>
            </select>
          </div>
          <hr />
          <div>{views[view]}</div>
        </div>
      </div>
    </div>
  );
};

export default Main;
