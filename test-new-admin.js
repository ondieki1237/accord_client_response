#!/usr/bin/env node

/**
 * Test the new admin credentials
 */

const API_URL = "https://accord-client-response.onrender.com/api"

async function testNewCredentials() {
  console.log("🔐 Testing new admin credentials...\n")
  
  const credentials = {
    email: "customerservice@accordmedical.co.ke",
    password: "customer2026"
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
      console.log("   Email:", data.admin.email)
      console.log("   Role:", data.admin.role)
      console.log("   Token:", data.token.substring(0, 30) + "...")
      console.log("\n🎉 You can now login to the admin panel with:")
      console.log("   📧 Email: customerservice@accordmedical.co.ke")
      console.log("   🔑 Password: customer2026")
    } else {
      console.log("❌ Login failed")
      console.log("   Response:", data)
    }
  } catch (error) {
    console.error("❌ Error:", error.message)
  }
}

testNewCredentials()
