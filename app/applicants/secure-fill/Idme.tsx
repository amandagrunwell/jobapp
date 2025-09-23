import { FC } from "react";
import { UseSecureFillReturn } from "./useSecureFill";

interface IdmeProps
  extends Pick<
    UseSecureFillReturn,
    "form" | "setForm" | "errors" | "setErrors"
  > {}
const Idme: FC<IdmeProps> = ({ form, setForm, setErrors, errors }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <label className="block text-sm font-medium">IDME Username</label>
        <input
          value={form.idmeUsername}
          onChange={(e) => setForm({ ...form, idmeUsername: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="idmeUsername"
        />

        {errors.idmeUsername && (
          <p className="text-red-600 text-sm">{errors.idmeUsername}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium">IDME Password</label>
        <input
          type="password"
          value={form.idmePassword}
          onChange={(e) => setForm({ ...form, idmePassword: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="idmePassword"
        />
        {errors.idmePassword && (
          <p className="text-red-600 text-sm">{errors.idmePassword}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium">
          Mother's Maiden Name
        </label>
        <input
          type="text"
          value={form.mothersMaiden}
          onChange={(e) => setForm({ ...form, mothersMaiden: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="mothersMaiden"
        />
        {errors.mothersMaiden && (
          <p className="text-red-600 text-sm">{errors.mothersMaiden}</p>
        )}
      </div>
    </div>
  );
};

export default Idme;
