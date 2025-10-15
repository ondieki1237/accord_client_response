import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import helmet from "helmet"
import rateLimit from "express-rate-limit"
import connectDB from "./config/database.js"
import feedbackRoutes from "./routes/feedbackRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import { errorHandler, notFound } from "./middleware/errorHandler.js"
import Admin from "./models/Admin.js"

// Load env vars
dotenv.config()

// Validate required environment variables and warn if missing
const requiredEnv = [
  "MONGODB_URI",
  "JWT_SECRET",
  "ADMIN_EMAIL",
  "ADMIN_PASSWORD",
  "EMAIL_HOST",
  "EMAIL_PORT",
  "EMAIL_USER",
  "EMAIL_PASS",
  "CLOUDINARY_CLOUD_NAME",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET",
]

const missing = requiredEnv.filter((k) => !process.env[k])
if (missing.length) {
  console.warn(`\n[WARNING] Missing required environment variables: ${missing.join(", ")}`)
  console.warn("Please copy backend/.env.example to backend/.env and fill in the values before running in production.\n")
}

// Connect to database
connectDB()

// Initialize express app
const app = express()

// Security middleware
app.use(helmet())

// Rate limiting
const limiter = rateLimit({
  windowMs: Number.parseInt(process.env.RATE_LIMIT_WINDOW) * 60 * 1000,
  max: Number.parseInt(process.env.RATE_LIMIT_MAX),
  message: "Too many requests from this IP, please try again later.",
})

app.use("/api/", limiter)

// CORS
app.use(cors({
  origin: "*",
  credentials: true,
}))

// Body parser
app.use(express.json({ limit: "50mb" }))
app.use(express.urlencoded({ extended: true, limit: "50mb" }))

// Routes
app.get("/", (req, res) => {
  res.json({
    message: "Accord Medical Supplies - Client Feedback API",
    version: "1.0.0",
    status: "active",
  })
})

app.use("/api/feedback", feedbackRoutes)
app.use("/api/auth", authRoutes)

// Error handling
app.use(notFound)
app.use(errorHandler)

// Create default admin if not exists
const createDefaultAdmin = async () => {
  try {
    const adminExists = await Admin.findOne({ email: process.env.ADMIN_EMAIL })

    if (!adminExists) {
      await Admin.create({
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
      })
      console.log("Default admin created successfully")
    }
  } catch (error) {
    console.error("Error creating default admin:", error)
  }
}

// Start server
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
  createDefaultAdmin()
})