"use client"

import { ChevronLeft, ThumbsUp } from "lucide-react"
import RatingInput from "../RatingInput"

export default function Step4Satisfaction({ formData, updateFormData, onNext, onPrevious }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    onNext()
  }

  const isValid = formData.recommendationLikelihood > 0

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-dark mb-2">Overall Satisfaction</h3>
        <p className="text-gray-600">Help us understand your overall experience</p>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg">
        <div className="flex items-start gap-4 mb-6">
          <div className="bg-primary p-3 rounded-lg">
            <ThumbsUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <h4 className="font-semibold text-lg text-dark mb-1">Would you recommend us?</h4>
            <p className="text-sm text-gray-600">
              On a scale of 1 to 10, how likely are you to recommend Accord Medical Supplies to others?
            </p>
          </div>
        </div>

        <RatingInput
          label="Recommendation Likelihood"
          value={formData.recommendationLikelihood}
          onChange={(value) => updateFormData({ recommendationLikelihood: value })}
          max={10}
          showLabels={true}
        />
      </div>

      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={onPrevious}
          className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
        >
          <ChevronLeft className="w-5 h-5" />
          Previous
        </button>
        <button
          type="submit"
          disabled={!isValid}
          className="px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Next Step
        </button>
      </div>
    </form>
  )
}
