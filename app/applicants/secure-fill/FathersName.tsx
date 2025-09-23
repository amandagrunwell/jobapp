import { FC } from "react";
import { useSecureFill, UseSecureFillReturn } from "./useSecureFill";

interface FathersNameProps
  extends Pick<
    UseSecureFillReturn,
    "form" | "setForm" | "errors" | "setErrors"
  > {}
const FathersName: FC<FathersNameProps> = ({
  form,
  setForm,
  setErrors,
  errors,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium">Father's First Name</label>
        <input
          value={form.fatherFirst}
          onChange={(e) => setForm({ ...form, fatherFirst: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="fatherFirst"
        />

        {errors.fatherFirst && (
          <p className="text-red-600 text-sm">{errors.fatherFirst}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium">Fathers's Last Name</label>
        <input
          type="text"
          value={form.fatherLast}
          onChange={(e) => setForm({ ...form, fatherLast: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="fatherLast"
        />
        {errors.fatherLast && (
          <p className="text-red-600 text-sm">{errors.fatherLast}</p>
        )}
      </div>
    </div>
  );
};
export default FathersName;
