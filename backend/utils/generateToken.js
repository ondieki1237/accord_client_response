import jwt from "jsonwebtoken"

export const generateToken = (id) => {
  // Support both JWT_EXPIRE and JWT_EXPIRES_IN for backward compatibility
  const expiresIn = process.env.JWT_EXPIRE || process.env.JWT_EXPIRES_IN || "7d"
  
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: expiresIn,
  })
}

export const generateRefreshToken = (id) => {
  // Support both JWT_REFRESH_EXPIRE and JWT_REFRESH_EXPIRES_IN
  const expiresIn = process.env.JWT_REFRESH_EXPIRE || process.env.JWT_REFRESH_EXPIRES_IN || "30d"
  
  return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: expiresIn,
  })
}
