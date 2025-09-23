import { ChangeEvent, FC } from "react";
import { useSecureFill, UseSecureFillReturn } from "./useSecureFill";

interface ssnProps
  extends Pick<
    UseSecureFillReturn,
    "form" | "setForm" | "errors" | "setErrors"
  > {}

const Ssn: FC<ssnProps> = ({ form, setForm, errors, setErrors }) => {
  return (
    <div className="w-1/2">
      <label className="block text-sm font-medium ">
        Social Security Number
      </label>
      <input
        value={form.ssn}
        onChange={(e) => setForm({ ...form, ssn: e.target.value })}
        className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="XXX-XX-XXXX"
      />
      {errors.ssn && <p className="text-red-600 text-sm">{errors.ssn}</p>}
    </div>
  );
};

export default Ssn;
