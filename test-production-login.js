#!/usr/bin/env node

/**
 * Test script to verify production backend login
 * Run: node test-production-login.js
 */

const API_URL = "https://accord-client-response.onrender.com/api"

async function testLogin() {
  console.log("🔍 Testing production backend login...\n")
  
  // Test 1: Check if API is accessible
  console.log("1️⃣ Checking API status...")
  try {
    const response = await fetch(`${API_URL.replace('/api', '')}/`)
    const data = await response.json()
    console.log("✅ API is online:", data.message)
    console.log("   Version:", data.version)
    console.log("   Status:", data.status)
  } catch (error) {
    console.error("❌ API is not accessible:", error.message)
    return
  }
  
  console.log("\n2️⃣ Testing admin login with credentials from .env...")
  
  // Test 2: Try login with default credentials
  const credentials = {
    email: "admin@example.com",
    password: "admin123s"
  }
  
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(credentials)
    })
    
    const data = await response.json()
    
    if (response.ok && data.success) {
      console.log("✅ Login successful!")
      console.log("   Token:", data.token.substring(0, 20) + "...")
      console.log("   Admin:", data.admin.email)
      console.log("   Role:", data.admin.role)
      console.log("\n✅ Your production credentials are working!")
    } else {
      console.log("❌ Login failed")
      console.log("   Status:", response.status)
      console.log("   Message:", data.message)
      console.log("\n⚠️  Possible issues:")
      console.log("   1. Admin user doesn't exist in production database")
      console.log("   2. Credentials are different in production")
      console.log("   3. Production environment variables not set correctly")
      console.log("\n💡 Solutions:")
      console.log("   - Check Render environment variables for ADMIN_EMAIL and ADMIN_PASSWORD")
      console.log("   - Redeploy backend to trigger admin user creation")
      console.log("   - Check backend logs on Render for any errors")
    }
  } catch (error) {
    console.error("❌ Login request failed:", error.message)
  }
}

testLogin()
