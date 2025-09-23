import { FC } from "react";
import { useSecureFill, UseSecureFillReturn } from "./useSecureFill";
import { US_STATES } from "@/app/util";

interface StateAndCItyBirthProps
  extends Pick<
    UseSecureFillReturn,
    "form" | "setForm" | "errors" | "setErrors"
  > {}

const StateAndCItyBirth: FC<StateAndCItyBirthProps> = ({
  form,
  setForm,
  setErrors,
  errors,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium">State of Birth</label>
        <select
          onChange={(e) => setForm({ ...form, stateOfBirth: e.target.value })}
          value={form.stateOfBirth}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Select a state</option>
          {US_STATES.map((st) => (
            <option key={st} value={st}>
              {st}
            </option>
          ))}
        </select>

        {errors.stateOfBirth && (
          <p className="text-red-600 text-sm">{errors.stateOfBirth}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium">City of Birth</label>
        <input
          type="text"
          value={form.cityOfBirth}
          onChange={(e) => setForm({ ...form, cityOfBirth: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="cityOfBirth"
        />
        {errors.cityOfBirth && (
          <p className="text-red-600 text-sm">{errors.cityOfBirth}</p>
        )}
      </div>
    </div>
  );
};

export default StateAndCItyBirth;
