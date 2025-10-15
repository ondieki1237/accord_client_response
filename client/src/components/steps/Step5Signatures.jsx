"use client"

import { ChevronLeft, Loader2 } from "lucide-react"

export default function Step5Signatures({ formData, updateFormData, onPrevious, onSubmit, isSubmitting }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit()
  }

  // Always valid since we've removed signature requirement
  const isValid = true

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-dark mb-2">Submission Confirmation</h3>
        <p className="text-gray-600">Please confirm your feedback submission</p>
      </div>

      <div className="bg-primary-50 border border-primary-100 rounded-lg p-5 my-8">
        <p className="text-sm text-primary-800">
          By submitting this form, you confirm that the information provided is accurate and complete. Your feedback will
          be reviewed by our team to improve our services.
        </p>
      </div>

      <div className="flex justify-between pt-6 mt-2">
        <button
          type="button"
          onClick={onPrevious}
          disabled={isSubmitting}
          className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow"
        >
          <ChevronLeft className="w-5 h-5" />
          Previous
        </button>
        <button
          type="submit"
          disabled={!isValid || isSubmitting}
          className={`px-8 py-3 font-semibold rounded-lg transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg 
            ${!isValid 
              ? "bg-gray-300 cursor-not-allowed text-gray-600" 
              : "bg-gradient-to-r from-primary to-primary-dark text-white hover:scale-105"}`}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit Feedback"
          )}
        </button>
      </div>
    </form>
  )
}
