"use client";
import React from "react";
import "dotenv/config";
import Link from "next/link";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Vector Design Elements */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 left-20 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-20 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>

      {/* Navigation */}
      <nav className="relative z-20 py-4 px-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold mr-2">
              A
            </div>
            <span className="text-xl font-semibold text-gray-800">
              ApexFocusGroup
            </span>
          </div>
          <div className="hidden md:flex space-x-6">
            <a
              href="#header"
              className="text-gray-700 hover:text-indigo-600 transition-colors"
            >
              Home
            </a>
            <a
              href="#about"
              className="text-gray-700 hover:text-indigo-600 transition-colors"
            >
              About
            </a>
            <a
              href="#services"
              className="text-gray-700 hover:text-indigo-600 transition-colors"
            >
              Services
            </a>
            <a
              href="/#"
              className="text-gray-700 hover:text-indigo-600 transition-colors"
              target="_blank"
            >
              Clinical Trials
            </a>
            <a
              href="/#"
              className="text-gray-700 hover:text-indigo-600 transition-colors"
            >
              Focus Groups
            </a>
            <a
              href="#contact"
              className="text-gray-700 hover:text-indigo-600 transition-colors"
            >
              Contact
            </a>
          </div>
          <button
            onClick={() => router.push("/#")}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md"
          >
            Join A Focus Group
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header id="header" className="relative z-10 py-16 md:py-24 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
            Get Paid For Your Opinion
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
            We help you find paid focus groups near you. Our team gathers focus
            groups from around the web and works directly with some of the top
            market research firms to bring you legitimate paid focus group
            opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push("/join")}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl text-lg font-medium"
            >
              Join Us Now
            </button>
            <button
              onClick={() => {
                const element = document.getElementById("about");
                element?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-8 py-4 rounded-xl bg-white text-indigo-600 border border-indigo-200 hover:bg-indigo-50 transition-all text-lg font-medium"
            >
              Learn More
            </button>
          </div>
        </div>
      </header>

      {/* About Section */}
      <section id="about" className="relative z-10 py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              What We Do?
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              Use your knowledge and expertise in your field to influence
              decision makers on products and services that matter. With
              everything from consumer packaged goods to medical and healthcare
              advancements, we offer a wide range of market research groups that
              fit your interests, background, lifestyle and location. Come join
              us, and receive compensation for making your voice heard.
            </p>
          </div>
          <div className="text-center">
            <button
              onClick={() => router.push("/join")}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md text-lg font-medium"
            >
              Join Us Now
            </button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="relative z-10 py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Our Market Research Services
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Focus Groups */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-white/50 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Focus Groups
              </h3>
              <h4 className="text-blue-600 font-medium mb-3">
                Receive compensation for your voice
              </h4>
              <p className="text-gray-600">
                We have over 1,000 legitimate focus group opportunities and
                worked with virtually every market research firm in the US.
              </p>
            </div>

            {/* Clinical Trials */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-white/50 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Clinical Trials
              </h3>
              <h4 className="text-blue-600 font-medium mb-3">
                Get access to experimental treatment
              </h4>
              <p className="text-gray-600">
                We help connect people with clinical research studies that offer
                treatments under development.
              </p>
            </div>

            {/* Paid Surveys */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-white/50 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Paid Survey Panels
              </h3>
              <h4 className="text-blue-600 font-medium mb-3">
                Help companies improve their products
              </h4>
              <p className="text-gray-600">
                Tell us what you think about the products you use every day or
                even try new ones before they hit store shelves!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="relative z-10 py-16 px-6 bg-indigo-900 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <div className="w-16 h-16 bg-indigo-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              ></path>
            </svg>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold mb-4">Subscribe Now</h2>
          <p className="text-indigo-200 mb-8 max-w-2xl mx-auto">
            Stay up-to-date and receive our latest news and press, sent straight
            to your email.
          </p>

          <form className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-grow px-4 py-3 rounded-lg bg-indigo-800 text-white placeholder-indigo-300 border border-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-white text-indigo-700 font-medium rounded-lg hover:bg-indigo-50 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="relative z-10 py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-2/5">
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=654&q=80"
                  alt="Rick Sullivan"
                  className="w-full h-auto"
                />
              </div>
            </div>

            <div className="md:w-3/5">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                What Our Member Says
              </h2>
              <p className="text-blue-600 font-medium mb-6">
                Rick Sullivan, 26 (Austin, TX)
              </p>
              <p className="text-gray-600 text-lg italic mb-6">
                &quot;Apex Focus Group has always been our go-to resource for
                making some extra income. I really feel like my opinion matters
                and I love taking part in focus groups and surveys. Thank
                you!&quot;
              </p>
              <div className="flex items-center">
                <div className="flex space-x-1 text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 fill-current"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-2 text-gray-600">5.0 Rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-indigo-600 mb-2">
                1000+
              </div>
              <div className="text-gray-700 font-medium">
                Market Research Opportunities
              </div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-indigo-600 mb-2">
                824
              </div>
              <div className="text-gray-700 font-medium">
                Active Participants
              </div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-indigo-600 mb-2">
                41
              </div>
              <div className="text-gray-700 font-medium">States</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-16 px-6 bg-indigo-800 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Join Our Panel and Get Paid For Your Opinions
          </h2>
          <button
            onClick={() => router.push("/join")}
            className="px-8 py-4 rounded-xl bg-white text-indigo-700 hover:bg-indigo-50 transition-all shadow-lg hover:shadow-xl text-lg font-medium"
          >
            Go Here To Get Started
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer
        id="contact"
        className="relative z-10 py-12 px-6 bg-gray-900 text-gray-300"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold mr-2">
                  A
                </div>
                <span className="text-xl font-semibold text-white">
                  ApexFocusGroup
                </span>
              </div>
              <p className="text-gray-400">
                Connecting voices to shape better products and services through
                market research.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">
                Quick Links
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Services
                  </a>
                </li>
                <li>
                  <a
                    href="/focus-groups"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Focus Groups
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    FAQ
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    href="/privacy"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="/terms"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">
                Contact Info
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-gray-400 mr-2 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    ></path>
                  </svg>
                  <span>contact@apexfocusgroup.com</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-gray-400 mr-2 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    ></path>
                  </svg>
                  <span>(555) 123-4567</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© All Right Reserved 2025 - ApexFocusGroup.com</p>
          </div>
        </div>
      </footer>

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

export default HomePage;
