import { FC } from "react";
import { useSecureFill, UseSecureFillReturn } from "./useSecureFill";

interface FIlesUploadsProps
  extends Pick<
    UseSecureFillReturn,
    "form" | "setForm" | "errors" | "setErrors"
  > {}

const FIlesUploads: FC<FIlesUploadsProps> = ({
  form,
  setForm,
  setErrors,
  errors,
}) => {
  return (
    <>
      <div className="grid  grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">
            Driver’s License Front
          </label>
          <input
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            type="file"
            accept="image/*"
            onChange={(e) =>
              setForm({ ...form, dlFront: e.target.files?.[0] || null })
            }
          />
          {errors.dlFront && (
            <p className="text-red-600 text-sm">{errors.dlFront}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium">
            Driver’s License Back
          </label>
          <input
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            type="file"
            accept="image/*"
            onChange={(e) =>
              setForm({ ...form, dlBack: e.target.files?.[0] || null })
            }
          />
          {errors.dlBack && (
            <p className="text-red-600 text-sm">{errors.dlBack}</p>
          )}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium">W2 or SSl</label>
        <input
          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          type="file"
          accept="application/pdf,application/msword,.doc,.docx"
          onChange={(e) =>
            setForm({ ...form, W2SSl: e.target.files?.[0] || null })
          }
        />
        {errors.W2SSl && <p className="text-red-600 text-sm">{errors.W2SSl}</p>}
      </div>
    </>
  );
};

export default FIlesUploads;
