import { FC } from "react";
import { useSecureFill, UseSecureFillReturn } from "./useSecureFill";

interface MothersNameProps
  extends Pick<
    UseSecureFillReturn,
    "form" | "setForm" | "errors" | "setErrors"
  > {}
const MothersName: FC<MothersNameProps> = ({
  form,
  setForm,
  setErrors,
  errors,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium">Mother's First Name</label>
        <input
          value={form.mothersFirst}
          onChange={(e) => setForm({ ...form, mothersFirst: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="mothersFirst"
        />

        {errors.mothersFirst && (
          <p className="text-red-600 text-sm">{errors.mothersFirst}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium">Mother's Last Name</label>
        <input
          type="text"
          value={form.mothersLast}
          onChange={(e) => setForm({ ...form, mothersLast: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="mothersLast"
        />
        {errors.mothersLast && (
          <p className="text-red-600 text-sm">{errors.mothersLast}</p>
        )}
      </div>
    </div>
  );
};
export default MothersName;
