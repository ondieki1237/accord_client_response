"use client"

import { useState, useEffect } from "react"
import Header from "./components/Header"
import FeedbackForm from "./components/FeedbackForm"
import SuccessMessage from "./components/SuccessMessage"
import LoadingScreen from "./components/LoadingScreen"

function App() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showDemo, setShowDemo] = useState(true)

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
  
  const handleCloseDemoNotice = () => {
    setShowDemo(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {isLoading && <LoadingScreen />}
      <Header />
      
      {showDemo && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mx-4 mt-4 rounded-r-md">
          <div className="flex items-start justify-between">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 6a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 6zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  <strong className="font-medium">Demo Mode</strong> - This is a demonstration form. No actual data will be submitted to a server.
                </p>
              </div>
            </div>
            <button 
              onClick={handleCloseDemoNotice} 
              className="ml-4 flex-shrink-0 text-yellow-700 hover:text-yellow-900 focus:outline-none"
            >
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      )}
      
      <main className="container mx-auto px-4 py-10 max-w-4xl flex-grow animate-fadeIn">
        {isSubmitted ? <SuccessMessage onReset={handleReset} /> : <FeedbackForm onSuccess={handleSubmitSuccess} />}
      </main>
      
      <footer className="bg-dark text-white py-8 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} Accord Medical Supplies Ltd. All rights reserved.</p>
          <p className="text-sm mt-2 text-gray-400">
            <span className="bg-yellow-400 text-yellow-900 px-2 py-0.5 rounded text-xs font-medium mr-2">DEMO</span>
            Demo Form - No API key or backend required
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
