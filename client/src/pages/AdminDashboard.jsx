"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getAllFeedback } from "../services/api"
import { LogOut, RefreshCw, Star, Calendar, Building2, User } from "lucide-react"

export default function AdminDashboard() {
  const [feedbackList, setFeedbackList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [total, setTotal] = useState(0)
  const navigate = useNavigate()

  const loadFeedback = async (page = 1) => {
    setIsLoading(true)
    setError("")

    try {
      const token = localStorage.getItem("adminToken")
      
      if (!token) {
        navigate("/admin")
        return
      }

      const response = await getAllFeedback(token, page, 10)
      
      if (response.success) {
        setFeedbackList(response.data)
        setTotalPages(response.totalPages)
        setCurrentPage(response.currentPage)
        setTotal(response.total)
      }
    } catch (err) {
      console.error("Error loading feedback:", err)
      if (err.response?.status === 401) {
        // Token expired or invalid
        localStorage.removeItem("adminToken")
        localStorage.removeItem("adminUser")
        navigate("/admin")
      } else {
        setError(err.response?.data?.message || "Failed to load feedback")
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadFeedback(1)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("adminToken")
    localStorage.removeItem("adminUser")
    navigate("/admin")
  }

  const getRatingColor = (rating, max = 5) => {
    const percentage = (rating / max) * 100
    if (percentage >= 80) return "text-green-600"
    if (percentage >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-sm text-gray-600">Accord Medical Supplies - Feedback Management</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-white rounded-lg hover:opacity-90 transition-opacity"
              style={{ backgroundColor: '#00aeef' }}
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="mb-8 bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Total Submissions</h2>
              <p className="text-3xl font-bold mt-2" style={{ color: '#00aeef' }}>{total}</p>
            </div>
            <button
              onClick={() => loadFeedback(currentPage)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* Feedback List */}
        {!isLoading && feedbackList.length === 0 && (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <p className="text-gray-600">No feedback submissions yet.</p>
          </div>
        )}

        {!isLoading && feedbackList.length > 0 && (
          <div className="space-y-6">
            {feedbackList.map((feedback) => (
              <div key={feedback._id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <User className="w-5 h-5 text-gray-600" />
                      <h3 className="text-xl font-bold text-gray-900">{feedback.clientName}</h3>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Building2 className="w-4 h-4" />
                        {feedback.facility}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(feedback.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {feedback.serviceType}
                    </span>
                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(feedback.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Ratings */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Product Quality</p>
                    <div className="flex items-center gap-2">
                      <Star className={`w-4 h-4 ${getRatingColor(feedback.productQuality)}`} />
                      <span className={`text-lg font-bold ${getRatingColor(feedback.productQuality)}`}>
                        {feedback.productQuality}/5
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Delivery</p>
                    <div className="flex items-center gap-2">
                      <Star className={`w-4 h-4 ${getRatingColor(feedback.deliveryTimelines)}`} />
                      <span className={`text-lg font-bold ${getRatingColor(feedback.deliveryTimelines)}`}>
                        {feedback.deliveryTimelines}/5
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Customer Service</p>
                    <div className="flex items-center gap-2">
                      <Star className={`w-4 h-4 ${getRatingColor(feedback.customerService)}`} />
                      <span className={`text-lg font-bold ${getRatingColor(feedback.customerService)}`}>
                        {feedback.customerService}/5
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Recommendation</p>
                    <div className="flex items-center gap-2">
                      <Star className={`w-4 h-4 ${getRatingColor(feedback.recommendationLikelihood, 10)}`} />
                      <span className={`text-lg font-bold ${getRatingColor(feedback.recommendationLikelihood, 10)}`}>
                        {feedback.recommendationLikelihood}/10
                      </span>
                    </div>
                  </div>
                </div>

                {/* Feedback Text */}
                {(feedback.challenges || feedback.suggestions) && (
                  <div className="space-y-3">
                    {feedback.challenges && (
                      <div>
                        <p className="text-sm font-semibold text-gray-700 mb-1">Challenges:</p>
                        <p className="text-sm text-gray-600 bg-yellow-50 p-3 rounded">{feedback.challenges}</p>
                      </div>
                    )}
                    {feedback.suggestions && (
                      <div>
                        <p className="text-sm font-semibold text-gray-700 mb-1">Suggestions:</p>
                        <p className="text-sm text-gray-600 bg-green-50 p-3 rounded">{feedback.suggestions}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Signatures */}
                {(feedback.clientSignature || feedback.salesRepSignature) && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-xs text-gray-600 mb-2">Signatures:</p>
                    <div className="flex gap-4">
                      {feedback.clientSignature && (
                        <div className="flex-1">
                          <p className="text-xs text-gray-500 mb-1">Client</p>
                          <img src={feedback.clientSignature} alt="Client signature" className="border rounded h-16 object-contain" />
                        </div>
                      )}
                      {feedback.salesRepSignature && (
                        <div className="flex-1">
                          <p className="text-xs text-gray-500 mb-1">Sales Rep</p>
                          <img src={feedback.salesRepSignature} alt="Sales rep signature" className="border rounded h-16 object-contain" />
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {!isLoading && totalPages > 1 && (
          <div className="mt-8 flex justify-center gap-2">
            <button
              onClick={() => loadFeedback(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="px-4 py-2 text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => loadFeedback(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </main>
    </div>
  )
}
