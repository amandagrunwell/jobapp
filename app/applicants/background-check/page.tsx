/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import CustomDatePicker from "@/app/components/CustomDatePicker";

type FormState = {
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  email: string;
  dob: string;
  ssn: string;

  employer: string;
  jobTitle: string;
  ref1Name: string;
  ref1Phone: string;
  ref1Email: string;
  ref2Name: string;
  ref2Phone: string;
  ref2Email: string;
  criminalRecord: string;
  dlFront: File | null;
  dlBack: File | null;
};

const initialFormState: FormState = {
  firstName: "",
  lastName: "",
  address: "",
  phone: "",
  email: "",
  dob: "",
  ssn: "",
  employer: "",
  jobTitle: "",
  ref1Name: "",
  ref1Phone: "",
  ref1Email: "",
  ref2Name: "",
  ref2Phone: "",
  ref2Email: "",
  criminalRecord: "",
  dlFront: null,
  dlBack: null,
};

export default function ApplicationForm() {
  const [form, setForm] = useState<FormState>(initialFormState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleDateChange = (date: Date | null, name: string) => {
    if (!date) return;

    // Format date as YYYY-MM-DD for consistency
    const formattedDate = date.toISOString().split("T")[0];
    setForm({
      ...form,
      dob: formattedDate,
    });
  };
  function validate() {
    const e: Record<string, string> = {};
    const ssNdigitsOnly = form.ssn.replace(/\D/g, "");
    if (!form.firstName.trim()) e.firstName = "First name is required";
    if (!form.lastName.trim()) e.lastName = "Last name is required";
    if (!form.address.trim()) e.address = "Address is required";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Valid email required";
    if (form.phone.replace(/\D/g, "").length < 10)
      e.phone = "Valid phone number required";
    if (!form.ssn.trim()) e.ssn = "SSN is required";
    if (form.ssn.length === 9 && !/^\d{9}$/.test(ssNdigitsOnly))
      e.ssn = "Valid ssn Required";

    if (!form.dlFront) e.dlFront = "Front of driver’s license required";
    if (!form.dlBack) e.dlBack = "Back of driver’s license required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    if (!validate()) return;
    setSubmitting(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => {
        if (v instanceof File || v === null) return;
        fd.append(k, v);
      });
      if (form.dlFront) fd.append("dlFront", form.dlFront);
      if (form.dlBack) fd.append("dlBack", form.dlBack);

      const res = await fetch("/api/background-check", {
        method: "POST",
        body: fd,
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Application submitted successfully.");
        setForm(initialFormState);
        router.push("/applicants/background-check/thank-you");
      } else setMessage(data.error || "Submission failed");
    } catch (err: any) {
      setMessage(err.message || "Unexpected error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Decorative blobs & shapes */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 left-20 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>

      <div className="max-w-3xl mx-auto p-6 relative z-10">
        <h1 className="text-3xl font-semibold mb-2 text-gray-800">
          Secure Personal Information Form
        </h1>
        <p className="text-sm text-gray-600 mb-6">
          Please provide accurate information. All data is encrypted and kept
          confidential.
        </p>

        <form
          onSubmit={onSubmit}
          className="space-y-4 bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/50 text-gray-700"
          encType="multipart/form-data"
        >
          {/* Full name & address */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">First Name</label>
              <input
                value={form.firstName}
                name="firstName"
                onChange={(e) =>
                  setForm({ ...form, firstName: e.target.value })
                }
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
          </div>

          <div>
            <label className="block text-sm font-medium">
              Current Mailing Address
            </label>
            <input
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="123 Main St, City, State"
            />
            {errors.address && (
              <p className="text-red-600 text-sm">{errors.address}</p>
            )}
          </div>

          {/* Contact */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Phone</label>

              <input
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="(555) 123-4567"
              />
              {errors.phone && (
                <p className="text-red-600 text-sm">{errors.phone}</p>
              )}
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
              {errors.email && (
                <p className="text-red-600 text-sm">{errors.email}</p>
              )}
            </div>
          </div>

          {/* SSN */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">
                Social Security Number
              </label>
              <input
                value={form.ssn}
                onChange={(e) => setForm({ ...form, ssn: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="XXX-XX-XXXX"
              />
              {errors.ssn && (
                <p className="text-red-600 text-sm">{errors.ssn}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium">Date of Birth</label>
              <CustomDatePicker
                name="dob"
                value={form.dob}
                onChange={handleDateChange}
              />
              {errors.dob && (
                <p className="text-red-600 text-sm">{errors.dob}</p>
              )}
            </div>
          </div>

          {/* Employer */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">
                Immediate Past Employer
              </label>
              <input
                value={form.employer}
                onChange={(e) => setForm({ ...form, employer: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Job Title</label>
              <input
                value={form.jobTitle}
                onChange={(e) => setForm({ ...form, jobTitle: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* References */}
          <h2 className="font-medium mt-4">Professional References</h2>
          {[1, 2].map((num) => (
            <div key={num} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                placeholder={`Ref ${num} Name`}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={(form as any)[`ref${num}Name`]}
                onChange={(e) =>
                  setForm({ ...form, [`ref${num}Name`]: e.target.value })
                }
              />
              <input
                placeholder="Phone"
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={(form as any)[`ref${num}Phone`]}
                onChange={(e) =>
                  setForm({ ...form, [`ref${num}Phone`]: e.target.value })
                }
              />
              <input
                placeholder="Email"
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={(form as any)[`ref${num}Email`]}
                onChange={(e) =>
                  setForm({ ...form, [`ref${num}Email`]: e.target.value })
                }
              />
            </div>
          ))}

          {/* Criminal record */}
          <div>
            <label className="block text-sm font-medium">
              Any arrest/criminal record? (If yes, provide details)
            </label>
            <textarea
              value={form.criminalRecord}
              onChange={(e) =>
                setForm({ ...form, criminalRecord: e.target.value })
              }
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
            />
          </div>

          {/* File uploads */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

          <button
            disabled={submitting}
            type="submit"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white disabled:opacity-50 hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg"
          >
            {submitting ? "Submitting…" : "Submit Application"}
          </button>

          {message && (
            <div className="rounded-md border p-3 mt-3 bg-blue-50 border-blue-200 text-blue-700">
              {message}
            </div>
          )}
        </form>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0, 0) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </main>
  );
}
