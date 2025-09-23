"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ApplicationSuccess = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Vector Design Elements (same as form) */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 left-20 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-20 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>

      {/* Geometric shapes (same as form) */}
      <div className="absolute top-1/4 right-1/4">
        <svg
          width="100"
          height="100"
          viewBox="0 0 100 100"
          className="opacity-10"
        >
          <polygon points="50,0 100,50 50,100 0,50" fill="#4F46E5" />
        </svg>
      </div>
      <div className="absolute bottom-1/3 left-10">
        <svg width="80" height="80" viewBox="0 0 80 80" className="opacity-10">
          <circle cx="40" cy="40" r="35" fill="#6366F1" />
        </svg>
      </div>

      <div className="max-w-3xl mx-auto p-6 relative z-10 flex items-center justify-center min-h-screen">
        <div className="w-full">
          {/* Success Card */}
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/50 text-center">
            {/* Success Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
            </div>

            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Submitted Successfully!
            </h1>

            <p className="text-gray-600 mb-8">
              Thank you for submitting the form.We do not store this information
            </p>

            {/* Contact Info */}
            <div className="bg-gray-50 p-5 rounded-lg mb-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">
                Have questions?
              </h3>
              <p className="text-gray-600">
                Email us at{" "}
                <a
                  href="mailto:recruiting@apexfocusgroup.com"
                  className="text-blue-600 hover:underline"
                >
                  hr@apexfocusgroup.com
                </a>{" "}
                or call{" "}
                <a
                  href="tel:+15551234567"
                  className="text-blue-600 hover:underline"
                >
                  (447) 437-0365
                </a>
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => router.push("/")}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg"
              >
                Return to Home
              </button>
              <button
                onClick={() => window.print()}
                className="px-6 py-3 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all border border-gray-300"
              >
                Print Confirmation
              </button>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-8 text-sm text-gray-600 text-center">
            <p>
              ApexFocusGroup — Connecting voices to shape better products and
              services
            </p>
            <p className="mt-2">
              <Link href="/#" className="text-blue-600 hover:underline">
                Privacy Policy
              </Link>{" "}
              •{" "}
              <Link href="/#" className="text-blue-600 hover:underline">
                Terms of Service
              </Link>
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default ApplicationSuccess;
