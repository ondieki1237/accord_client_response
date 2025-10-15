"use client"

import { Loader2 } from "lucide-react"

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50">
      <div className="flex flex-col items-center">
        <div className="bg-primary/10 p-6 rounded-full">
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
        </div>
        <h2 className="text-xl font-semibold mt-4 text-primary">Loading...</h2>
        <p className="text-sm text-gray-600 mt-2">Please wait while we process your request</p>
      </div>
    </div>
  )
}