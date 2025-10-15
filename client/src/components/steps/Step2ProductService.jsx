"use client"

import { ChevronLeft } from "lucide-react"
import RatingInput from "../RatingInput"

export default function Step2ProductService({ formData, updateFormData, onNext, onPrevious }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    onNext()
  }

  const isValid = formData.productQuality > 0 && formData.deliveryTimelines > 0 && formData.customerService > 0

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-dark mb-2">Product & Service Feedback</h3>
        <p className="text-gray-600">Please rate your experience with our products and services</p>
      </div>

      <div className="space-y-8">
        <RatingInput
          label="Product Quality"
          description="How would you rate the quality of our medical supplies?"
          value={formData.productQuality}
          onChange={(value) => updateFormData({ productQuality: value })}
          max={5}
        />

        <RatingInput
          label="Delivery Timelines"
          description="How satisfied are you with our delivery speed and reliability?"
          value={formData.deliveryTimelines}
          onChange={(value) => updateFormData({ deliveryTimelines: value })}
          max={5}
        />

        <RatingInput
          label="Customer Service"
          description="How would you rate our customer service and support?"
          value={formData.customerService}
          onChange={(value) => updateFormData({ customerService: value })}
          max={5}
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
