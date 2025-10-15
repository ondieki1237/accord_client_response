"use client"

import { Star } from "lucide-react"

export default function RatingInput({ label, description, value, onChange, max = 5, showLabels = false }) {
  // Function to get rating description
  const getRatingDescription = (val) => {
    if (max === 5) {
      switch (val) {
        case 1: return "Poor";
        case 2: return "Fair";
        case 3: return "Good";
        case 4: return "Very Good";
        case 5: return "Excellent";
        default: return "";
      }
    } else if (max === 10) {
      if (val >= 9) return "Excellent";
      if (val >= 7) return "Very Good";
      if (val >= 5) return "Good";
      if (val >= 3) return "Fair";
      if (val > 0) return "Poor";
      return "";
    }
    return "";
  };

  return (
    <div className="space-y-4 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-100 shadow-sm">
      <div>
        <h4 className="font-semibold text-dark text-lg mb-1">{label}</h4>
        {description && <p className="text-sm text-gray-600">{description}</p>}
      </div>

      <div className="flex flex-wrap items-center gap-2 md:gap-3">
        {Array.from({ length: max }, (_, i) => i + 1).map((rating) => (
          <button 
            key={rating} 
            type="button" 
            onClick={() => onChange(rating)} 
            className="group relative focus:outline-none focus:ring-2 focus:ring-primary/50 transform transition-transform hover:scale-110 active:scale-95"
            aria-label={`Rate ${rating} out of ${max}`}
          >
            {max <= 5 ? (
              <Star
                className={`w-9 h-9 md:w-10 md:h-10 transition-all duration-200 ${
                  rating <= value ? "fill-yellow-400 text-yellow-400" : "text-gray-300 group-hover:text-yellow-200"
                }`}
                strokeWidth={1.5}
              />
            ) : (
              <div
                className={`w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center font-bold text-lg transition-all duration-200 ${
                  rating <= value 
                    ? "bg-gradient-to-br from-primary to-primary-dark text-white shadow-md" 
                    : "bg-gray-200 text-gray-600 group-hover:bg-primary-100"
                }`}
              >
                {rating}
              </div>
            )}
          </button>
        ))}
        {value > 0 && (
          <span className="ml-4 bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-200 text-lg font-semibold text-primary">
            {value}/{max}
          </span>
        )}
      </div>

      {value > 0 && (
        <div className="mt-2 bg-white p-2 rounded-md border border-gray-200 inline-block">
          <span className={`text-sm font-medium ${
            value > (max * 0.7) ? 'text-green-600' : 
            value > (max * 0.4) ? 'text-amber-600' : 
            'text-red-600'
          }`}>
            {getRatingDescription(value)}
          </span>
        </div>
      )}

      {showLabels && (
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>Not satisfied</span>
          <span>Very satisfied</span>
        </div>
      )}
    </div>
  )
}
