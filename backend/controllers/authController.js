import Admin from "../models/Admin.js"
import { generateToken } from "../utils/generateToken.js"

// @desc    Admin login
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    // Check if admin exists
    const admin = await Admin.findOne({ email }).select("+password")

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      })
    }

    // Check password
    const isPasswordMatch = await admin.comparePassword(password)

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      })
    }

    // Generate token
    const token = generateToken(admin._id)

    res.status(200).json({
      success: true,
      token,
      admin: {
        id: admin._id,
        email: admin.email,
        role: admin.role,
      },
    })
  } catch (error) {
    console.error("Login error:", error)
    res.status(500).json({
      success: false,
      message: "Error logging in",
      error: error.message,
    })
  }
}

// @desc    Get current admin
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id)

    res.status(200).json({
      success: true,
      data: admin,
    })
  } catch (error) {
    console.error("Error fetching admin:", error)
    res.status(500).json({
      success: false,
      message: "Error fetching admin data",
      error: error.message,
    })
  }
}
