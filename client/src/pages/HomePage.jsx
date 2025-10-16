"use client"

import { useState, useEffect } from "react"
import Header from "../components/Header"
import FeedbackForm from "../components/FeedbackForm"
import SuccessMessage from "../components/SuccessMessage"
import LoadingScreen from "../components/LoadingScreen"

export default function HomePage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [])

  const handleSubmitSuccess = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsSubmitted(true)
      setIsLoading(false)
      // Scroll to top when submission is successful
      window.scrollTo({ top: 0, behavior: "smooth" })
    }, 1500)
  }

  const handleReset = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setIsLoading(false)
      // Scroll to top when resetting the form
      window.scrollTo({ top: 0, behavior: "smooth" })
    }, 800)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {isLoading && <LoadingScreen />}
      <Header />
      
      {/* notice removed */}
      
      <main className="container mx-auto px-4 py-10 max-w-4xl flex-grow animate-fadeIn">
        {isSubmitted ? <SuccessMessage onReset={handleReset} /> : <FeedbackForm onSuccess={handleSubmitSuccess} />}
      </main>
      
      <footer className="bg-dark text-white py-8 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} Accord Medical Supplies Ltd. All rights reserved.</p>
          {/* label removed */}
        </div>
      </footer>
    </div>
  )
}
