"use client"

import { ChevronLeft, MessageSquare } from "lucide-react"

export default function Step3ClientExperience({ formData, updateFormData, onNext, onPrevious }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    onNext()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-dark mb-2">Client Experience</h3>
        <p className="text-gray-600">Share your thoughts, challenges, and suggestions with us</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <MessageSquare className="inline w-4 h-4 mr-2" />
            Any Challenges?
          </label>
          <textarea
            value={formData.challenges}
            onChange={(e) => updateFormData({ challenges: e.target.value })}
            placeholder="Please describe any challenges you've experienced with our products or services..."
            rows={5}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
          />
          <p className="text-xs text-gray-500 mt-1">Optional</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <MessageSquare className="inline w-4 h-4 mr-2" />
            Suggestions for Improvement
          </label>
          <textarea
            value={formData.suggestions}
            onChange={(e) => updateFormData({ suggestions: e.target.value })}
            placeholder="We'd love to hear your suggestions on how we can serve you better..."
            rows={5}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
          />
          <p className="text-xs text-gray-500 mt-1">Optional</p>
        </div>
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
          className="px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors"
        >
          Next Step
        </button>
      </div>
    </form>
  )
}
