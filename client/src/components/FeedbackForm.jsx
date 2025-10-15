"use client"

import { useState } from "react"
import StepIndicator from "./StepIndicator"
import Step1ClientInfo from "./steps/Step1ClientInfo"
import Step2ProductService from "./steps/Step2ProductService"
import Step3ClientExperience from "./steps/Step3ClientExperience"
import Step4Satisfaction from "./steps/Step4Satisfaction"
import Step5Signatures from "./steps/Step5Signatures"
import { submitFeedback } from "../services/api"

const STEPS = [
  { number: 1, title: "Client Information", component: Step1ClientInfo },
  { number: 2, title: "Product & Service", component: Step2ProductService },
  { number: 3, title: "Client Experience", component: Step3ClientExperience },
  { number: 4, title: "Overall Satisfaction", component: Step4Satisfaction },
  { number: 5, title: "Submit Feedback", component: Step5Signatures },
]

export default function FeedbackForm({ onSuccess }) {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    clientName: "",
    facility: "",
    serviceType: "", // Changed from salesRep to serviceType
    productQuality: 0,
    deliveryTimelines: 0,
    customerService: 0,
    challenges: "",
    suggestions: "",
    recommendationLikelihood: 0
  })

  const updateFormData = (data) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      // Submit feedback to the real API endpoint
      const response = await submitFeedback(formData)
      console.log("Submission successful:", response)
      
      // Show success message
      onSuccess()
    } catch (error) {
      console.error("Error submitting feedback:", error)
      // Show error message
      alert("Failed to submit feedback. Please try again.")
      setIsSubmitting(false)
    }
  }

  const CurrentStepComponent = STEPS[currentStep - 1].component

  return (
    <div className="bg-white rounded-2xl shadow-md max-w-3xl mx-auto my-12 overflow-hidden transition-all duration-300">
      {/* Header with Branding */}
      <div className="bg-indigo-900 text-white text-center py-6">
        <h1 className="text-2xl font-semibold">Accord Medical Client Feedback</h1>
        <p className="text-sm mt-1 opacity-80">Your input helps us improve our services</p>
      </div>

      {/* Step Indicator */}
      <StepIndicator steps={STEPS} currentStep={currentStep} />

      {/* Form Content */}
      <div className="p-6 sm:p-8 md:p-10 bg-gray-50">
        <CurrentStepComponent
          formData={formData}
          updateFormData={updateFormData}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          isFirstStep={currentStep === 1}
          isLastStep={currentStep === STEPS.length}
        />
      </div>

      {/* Form Progress */}
      <div className="bg-white px-6 py-4 border-t border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500 font-medium">
            Step {currentStep} of {STEPS.length}
          </p>
          <div className="w-full sm:w-1/2 bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-teal-400 h-3 rounded-full transition-all duration-500 ease-in-out"
              style={{ width: `${(currentStep / STEPS.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  )
}