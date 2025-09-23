import { FC } from "react";
import { useSecureFill, UseSecureFillReturn } from "./useSecureFill";

interface ContactProps
  extends Pick<
    UseSecureFillReturn,
    "form" | "setForm" | "errors" | "setErrors"
  > {}

const Contact: FC<ContactProps> = ({ form, setForm, errors }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium">Phone</label>
        <input
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="(555) 123-4567"
        />
        {errors.phone && <p className="text-red-600 text-sm">{errors.phone}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="you@example.com"
          type="email"
        />
        {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
      </div>
    </div>
  );
};

export default Contact;
