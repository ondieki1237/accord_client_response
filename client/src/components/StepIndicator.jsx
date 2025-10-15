import { Check } from "lucide-react"

export default function StepIndicator({ steps, currentStep }) {
  return (
    <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-4 md:px-8 py-6 border-b border-gray-200">
      <div className="flex items-center justify-between overflow-x-auto no-scrollbar">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center flex-1 min-w-[80px]">
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 shadow ${
                  step.number < currentStep
                    ? "bg-primary-400 text-white"
                    : step.number === currentStep
                      ? "bg-primary text-white ring-4 ring-primary-100 scale-110"
                      : "bg-gray-300 text-gray-600"
                }`}
              >
                {step.number < currentStep ? <Check className="w-4 h-4 md:w-5 md:h-5" /> : step.number}
              </div>
              <span
                className={`text-[10px] md:text-xs mt-2 font-medium text-center truncate max-w-[70px] md:max-w-full ${
                  step.number === currentStep
                    ? "text-primary-700 font-bold"
                    : step.number < currentStep
                      ? "text-gray-700"
                      : "text-gray-500"
                }`}
              >
                {step.title}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-1 md:h-1.5 mx-1 md:mx-4 rounded-full transition-colors duration-300 ${
                  step.number < currentStep ? "bg-primary-300" : "bg-gray-300"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
