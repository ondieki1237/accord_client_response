import Feedback from "../models/Feedback.js"
import cloudinary from "../config/cloudinary.js"
import { sendFeedbackNotification } from "../utils/emailService.js"

// @desc    Submit new feedback
// @route   POST /api/feedback
// @access  Public
export const submitFeedback = async (req, res) => {
  try {
    const {
      date,
      clientName,
      facility,
      serviceType,
      productQuality,
      deliveryTimelines,
      customerService,
      challenges,
      suggestions,
      recommendationLikelihood,
      clientSignature,
      salesRepSignature,
    } = req.body

    // Prepare feedback data
    const feedbackData = {
      date,
      clientName,
      facility,
      serviceType,
      productQuality,
      deliveryTimelines,
      customerService,
      challenges,
      suggestions,
      recommendationLikelihood,
    }

    // Only upload signatures to Cloudinary if provided
    if (clientSignature) {
      try {
        const clientSigUpload = await cloudinary.uploader.upload(clientSignature, {
          folder: "accord_medical/signatures",
          resource_type: "image",
        })
        feedbackData.clientSignature = clientSigUpload.secure_url
      } catch (error) {
        console.error("Error uploading client signature:", error)
        // Continue without signature if upload fails
      }
    }

    if (salesRepSignature) {
      try {
        const salesRepSigUpload = await cloudinary.uploader.upload(salesRepSignature, {
          folder: "accord_medical/signatures",
          resource_type: "image",
        })
        feedbackData.salesRepSignature = salesRepSigUpload.secure_url
      } catch (error) {
        console.error("Error uploading sales rep signature:", error)
        // Continue without signature if upload fails
      }
    }

    // Create feedback
    const feedback = await Feedback.create(feedbackData)

    // Send email notification
    try {
      await sendFeedbackNotification(feedback)
    } catch (emailError) {
      console.error("Email notification failed:", emailError)
      // Don't fail the request if email fails
    }

    res.status(201).json({
      success: true,
      message: "Feedback submitted successfully",
      data: feedback,
    })
  } catch (error) {
    console.error("Error submitting feedback:", error)
    res.status(500).json({
      success: false,
      message: "Error submitting feedback",
      error: error.message,
    })
  }
}

// @desc    Get all feedback
// @route   GET /api/feedback
// @access  Private (Admin)
export const getAllFeedback = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, serviceType, facility } = req.query

    const query = {}
    if (status) query.status = status
    if (serviceType) query.serviceType = serviceType
    if (facility) query.facility = new RegExp(facility, "i")

    const feedback = await Feedback.find(query)
      .sort({ date: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec()

    const count = await Feedback.countDocuments(query)

    res.status(200).json({
      success: true,
      data: feedback,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count,
    })
  } catch (error) {
    console.error("Error fetching feedback:", error)
    res.status(500).json({
      success: false,
      message: "Error fetching feedback",
      error: error.message,
    })
  }
}

// @desc    Get single feedback
// @route   GET /api/feedback/:id
// @access  Private (Admin)
export const getFeedbackById = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id)

    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: "Feedback not found",
      })
    }

    res.status(200).json({
      success: true,
      data: feedback,
    })
  } catch (error) {
    console.error("Error fetching feedback:", error)
    res.status(500).json({
      success: false,
      message: "Error fetching feedback",
      error: error.message,
    })
  }
}

// @desc    Update feedback status
// @route   PATCH /api/feedback/:id
// @access  Private (Admin)
export const updateFeedbackStatus = async (req, res) => {
  try {
    const { status } = req.body

    const feedback = await Feedback.findByIdAndUpdate(req.params.id, { status }, { new: true, runValidators: true })

    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: "Feedback not found",
      })
    }

    res.status(200).json({
      success: true,
      message: "Feedback status updated",
      data: feedback,
    })
  } catch (error) {
    console.error("Error updating feedback:", error)
    res.status(500).json({
      success: false,
      message: "Error updating feedback",
      error: error.message,
    })
  }
}

// @desc    Delete feedback
// @route   DELETE /api/feedback/:id
// @access  Private (Admin)
export const deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id)

    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: "Feedback not found",
      })
    }

    // Delete signatures from Cloudinary if they exist
    try {
      if (feedback.clientSignature) {
        const clientPublicId = feedback.clientSignature.split("/").slice(-2).join("/").split(".")[0]
        await cloudinary.uploader.destroy(clientPublicId)
      }
      
      if (feedback.salesRepSignature) {
        const salesRepPublicId = feedback.salesRepSignature.split("/").slice(-2).join("/").split(".")[0]
        await cloudinary.uploader.destroy(salesRepPublicId)
      }
    } catch (cloudinaryError) {
      console.error("Error deleting signatures from Cloudinary:", cloudinaryError)
    }

    await feedback.deleteOne()

    res.status(200).json({
      success: true,
      message: "Feedback deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting feedback:", error)
    res.status(500).json({
      success: false,
      message: "Error deleting feedback",
      error: error.message,
    })
  }
}

// @desc    Get feedback statistics
// @route   GET /api/feedback/stats
// @access  Private (Admin)
export const getFeedbackStats = async (req, res) => {
  try {
    const totalFeedback = await Feedback.countDocuments()
    const pendingFeedback = await Feedback.countDocuments({ status: "pending" })
    const reviewedFeedback = await Feedback.countDocuments({ status: "reviewed" })

    const avgRatings = await Feedback.aggregate([
      {
        $group: {
          _id: null,
          avgProductQuality: { $avg: "$productQuality" },
          avgDeliveryTimelines: { $avg: "$deliveryTimelines" },
          avgCustomerService: { $avg: "$customerService" },
          avgRecommendation: { $avg: "$recommendationLikelihood" },
        },
      },
    ])

    res.status(200).json({
      success: true,
      data: {
        totalFeedback,
        pendingFeedback,
        reviewedFeedback,
        averageRatings: avgRatings[0] || {},
      },
    })
  } catch (error) {
    console.error("Error fetching stats:", error)
    res.status(500).json({
      success: false,
      message: "Error fetching statistics",
      error: error.message,
    })
  }
}
