import axios from "axios"

// Define the API URL to point to localhost:5000
const API_URL = "http://localhost:5000/api"

// Create axios instance with default configuration
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds timeout
})

// Add request interceptor for logging requests
api.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method.toUpperCase()} ${config.url}`)
    return config
  },
  (error) => {
    console.error("API Request Error:", error)
    return Promise.reject(error)
  }
)

// Add response interceptor for logging responses and error handling
api.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.status} ${response.statusText}`)
    return response
  },
  (error) => {
    if (error.response) {
      console.error(`API Error: ${error.response.status} ${error.response.statusText}`)
    } else {
      console.error("API Error:", error.message)
    }
    return Promise.reject(error)
  }
)

/**
 * Submit client feedback to the API
 * @param {Object} feedbackData - The client feedback data
 * @returns {Promise<Object>} - Response data
 */
export const submitFeedback = async (feedbackData) => {
  try {
    // Add timestamp for the submission
    const dataToSubmit = {
      ...feedbackData,
      submittedAt: new Date().toISOString()
    }
    
    const response = await api.post("/feedback", dataToSubmit)
    return response.data
  } catch (error) {
    console.error("Feedback Submission Error:", error)
    throw error
  }
}

/**
 * Login to the application
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<Object>} - Response with user data and token
 */
export const login = async (email, password) => {
  try {
    const response = await api.post("/auth/login", { email, password })
    return response.data
  } catch (error) {
    console.error("Login Error:", error)
    throw error
  }
}

/**
 * Get all feedback submissions
 * @returns {Promise<Object>} - Response with all feedback data
 */
export const getAllFeedback = async () => {
  try {
    const response = await api.get("/feedback")
    return response.data
  } catch (error) {
    console.error("Get Feedback Error:", error)
    throw error
  }
}

/**
 * Get feedback by ID
 * @param {string} feedbackId - ID of the feedback to retrieve
 * @returns {Promise<Object>} - Response with feedback data
 */
export const getFeedbackById = async (feedbackId) => {
  try {
    const response = await api.get(`/feedback/${feedbackId}`)
    return response.data
  } catch (error) {
    console.error("Get Feedback Error:", error)
    throw error
  }
}

export default api
