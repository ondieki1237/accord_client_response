import express from "express"
import {
  submitFeedback,
  getAllFeedback,
  getFeedbackById,
  updateFeedbackStatus,
  deleteFeedback,
  getFeedbackStats,
} from "../controllers/feedbackController.js"
import { protect } from "../middleware/auth.js"

const router = express.Router()

// Public routes
router.post("/", submitFeedback)

// Protected routes (Admin only)
router.get("/", protect, getAllFeedback)
router.get("/stats", protect, getFeedbackStats)
router.get("/:id", protect, getFeedbackById)
router.patch("/:id", protect, updateFeedbackStatus)
router.delete("/:id", protect, deleteFeedback)

export default router
