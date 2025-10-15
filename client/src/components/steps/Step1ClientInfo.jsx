"use client"

import { Calendar, Building2, User, UserCheck } from "lucide-react"

export default function Step1ClientInfo({ formData, updateFormData, onNext }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    onNext()
  }

  const isValid = formData.date && formData.clientName.trim() && formData.facility.trim() && formData.serviceType

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-dark mb-2">Client Information</h3>
        <p className="text-gray-600">Please provide your basic information to get started</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Calendar className="inline w-4 h-4 mr-2" />
            Date
          </label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => updateFormData({ date: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <User className="inline w-4 h-4 mr-2" />
            Client Name
          </label>
          <input
            type="text"
            value={formData.clientName}
            onChange={(e) => updateFormData({ clientName: e.target.value })}
            placeholder="Enter your full name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-primary-300 focus:shadow-md transition-all duration-200"
            required
          />
          <p className="text-xs text-gray-500 mt-1 ml-1">Full name as it appears on your records</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Building2 className="inline w-4 h-4 mr-2" />
            Facility
          </label>
          <input
            type="text"
            value={formData.facility}
            onChange={(e) => updateFormData({ facility: e.target.value })}
            placeholder="Enter facility name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-primary-300 focus:shadow-md transition-all duration-200"
            required
          />
          <p className="text-xs text-gray-500 mt-1 ml-1">Hospital, clinic or institution name</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <UserCheck className="inline w-4 h-4 mr-2" />
            Service Type
          </label>
          <select
            value={formData.serviceType}
            onChange={(e) => updateFormData({ serviceType: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-primary-300 focus:shadow-md transition-all duration-200"
            required
          >
            <option value="">Select service type</option>
            <option value="service">Service</option>
            <option value="purchase">Purchase</option>
            <option value="maintenance">Maintenance</option>
          </select>
          <p className="text-xs text-gray-500 mt-1 ml-1">Type of service you received from Accord Medical</p>
        </div>
      </div>

      <div className="flex justify-end pt-6">
        <button
          type="submit"
          disabled={!isValid}
          className={`px-8 py-3 font-semibold rounded-lg transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg
            ${!isValid 
              ? "bg-gray-300 cursor-not-allowed text-gray-600" 
              : "bg-gradient-to-r from-primary to-primary-dark text-white hover:scale-105"}`}
        >
          Next Step
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6"></path>
          </svg>
        </button>
      </div>
    </form>
  )
}
