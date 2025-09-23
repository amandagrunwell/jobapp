import { ChangeEvent, FC, ReactElement } from "react";
import { useSecureFill, UseSecureFillReturn } from "./useSecureFill";
import CustomDatePicker from "@/app/components/CustomDatePicker";
import { US_STATES } from "@/app/util";

// interface NameAndAddressProps {}

interface NameAndAddressProps
  extends Pick<
    UseSecureFillReturn,
    "form" | "setForm" | "errors" | "setErrors"
  > {}

const NameAndAddress: FC<NameAndAddressProps> = ({ form, setForm, errors }) => {
  function formChange(e: ChangeEvent<HTMLInputElement>) {
    console.log(e.target.value);
  }

  const handleDateChange = (date: Date | null, name: string) => {
    if (!date) return;

    // Format date as YYYY-MM-DD for consistency
    const formattedDate = date.toISOString().split("T")[0];
    setForm({
      ...form,
      dob: formattedDate,
    });
  };
  return (
    <div className="flex flex-col space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium">First Name</label>
          <input
            value={form.firstName}
            name="firstName"
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Jane"
          />
          {errors.firstName && (
            <p className="text-red-600 text-sm">{errors.firstName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Last Name</label>
          <input
            value={form.lastName}
            name="lastName"
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Jane"
          />
          {errors.lastName && (
            <p className="text-red-600 text-sm">{errors.lastName}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium">Other Names</label>
          <input
            value={form.otherNames}
            name="lastName"
            onChange={(e) => setForm({ ...form, otherNames: e.target.value })}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Jane"
          />
          {errors.otherNames && (
            <p className="text-red-600 text-sm">{errors.otherNames}</p>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">
            Current Mailing Address
          </label>
          <input
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="123 Main St"
          />
          {errors.address && (
            <p className="text-red-600 text-sm">{errors.address}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium">Date of Birth</label>
          <CustomDatePicker
            name="dob"
            value={form.dob}
            onChange={handleDateChange}
          />
          {errors.dob && <p className="text-red-600 text-sm">{errors.dob}</p>}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium">State</label>
          <select
            onChange={(e) => setForm({ ...form, state: e.target.value })}
            value={form.state}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select a state</option>
            {US_STATES.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>

          {errors.state && (
            <p className="text-red-600 text-sm">{errors.state}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium">City</label>
          <input
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="city"
          />
          {errors.city && <p className="text-red-600 text-sm">{errors.city}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">Zip Code</label>
          <input
            value={form.zipCode}
            onChange={(e) => setForm({ ...form, zipCode: e.target.value })}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Zip Code"
          />
          {errors.zipCode && (
            <p className="text-red-600 text-sm">{errors.zipCode}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NameAndAddress;
