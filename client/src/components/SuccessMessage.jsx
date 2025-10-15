"use client"

import { CheckCircle, Home, ArrowRight } from "lucide-react"

export default function SuccessMessage({ onReset }) {
  return (
    <div className="bg-white rounded-xl shadow-form p-8 md:p-12 text-center">
      <div className="flex justify-center mb-8">
        <div className="bg-green-100 p-5 rounded-full animate-pulse">
          <CheckCircle className="w-16 h-16 text-green-600" />
        </div>
      </div>

      <h2 className="text-3xl font-bold text-dark mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-dark">
        Thank You for Your Feedback!
      </h2>

      <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
        Your feedback has been successfully submitted. We truly appreciate you taking the time to share your experience
        with us. Your input helps us improve our products and services to better serve you.
      </p>

      <div className="bg-primary-50 border border-primary-200 rounded-xl p-6 mb-10 max-w-2xl mx-auto">
        <p className="text-sm text-primary-800">
          Our team will review your feedback carefully. If any follow-up is needed, we will contact you shortly. Thank
          you for your continued partnership with Accord Medical Supplies Ltd.
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-center gap-4">
        <button
          onClick={onReset}
          className="px-8 py-3.5 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-all duration-300 shadow-md hover:shadow-lg inline-flex items-center justify-center gap-2"
        >
          <Home className="w-5 h-5" />
          Submit Another Feedback
        </button>
        
        <button
          onClick={() => window.location.href = "https://accordmedical.co.ke"}
          className="px-8 py-3.5 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all duration-300 shadow-sm hover:shadow inline-flex items-center justify-center gap-2"
        >
          Visit Website
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      <div className="mt-8 pt-8 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          Visit our website at{" "}
          <a
            href="https://accordmedical.co.ke"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline font-medium"
          >
            accordmedical.co.ke
          </a>
        </p>
      </div>
    </div>
  )
}
