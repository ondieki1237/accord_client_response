import mongoose from "mongoose"

const feedbackSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    clientName: {
      type: String,
      required: [true, "Client name is required"],
      trim: true,
    },
    facility: {
      type: String,
      required: [true, "Facility name is required"],
      trim: true,
    },
    serviceType: {
      type: String,
      required: [true, "Service type is required"],
      enum: ["service", "purchase", "maintenance"],
      trim: true,
    },
    productQuality: {
      type: Number,
      required: [true, "Product quality rating is required"],
      min: 1,
      max: 5,
    },
    deliveryTimelines: {
      type: Number,
      required: [true, "Delivery timelines rating is required"],
      min: 1,
      max: 5,
    },
    customerService: {
      type: Number,
      required: [true, "Customer service rating is required"],
      min: 1,
      max: 5,
    },
    challenges: {
      type: String,
      trim: true,
      default: "",
    },
    suggestions: {
      type: String,
      trim: true,
      default: "",
    },
    recommendationLikelihood: {
      type: Number,
      required: [true, "Recommendation likelihood is required"],
      min: 1,
      max: 10,
    },
    clientSignature: {
      type: String,
      // Now optional
    },
    salesRepSignature: {
      type: String,
      // Now optional
    },
    status: {
      type: String,
      enum: ["pending", "reviewed", "archived"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  },
)

// Add indexes for better query performance
feedbackSchema.index({ date: -1 })
feedbackSchema.index({ clientName: 1 })
feedbackSchema.index({ facility: 1 })
feedbackSchema.index({ serviceType: 1 })
feedbackSchema.index({ status: 1 })

const Feedback = mongoose.model("Feedback", feedbackSchema)

export default Feedback
