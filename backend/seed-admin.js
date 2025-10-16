import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import dotenv from "dotenv"

// Load environment variables
dotenv.config()

// Admin Schema (matching your model)
const adminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      default: "admin",
    },
  },
  {
    timestamps: true,
  }
)

const Admin = mongoose.model("Admin", adminSchema)

async function seedAdmin() {
  try {
    console.log("🌱 Starting admin seeding process...\n")

    // Connect to MongoDB
    console.log("📡 Connecting to MongoDB...")
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("✅ Connected to MongoDB\n")

    // New admin credentials
    const newAdmin = {
      email: "customerservice@accordmedical.co.ke",
      password: "customer2026",
      role: "admin"
    }

    // Check if admin already exists
    console.log(`🔍 Checking if admin ${newAdmin.email} exists...`)
    const existingAdmin = await Admin.findOne({ email: newAdmin.email })

    if (existingAdmin) {
      console.log(`⚠️  Admin ${newAdmin.email} already exists!`)
      console.log("   Updating password...\n")
      
      // Hash the new password
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(newAdmin.password, salt)
      
      // Update existing admin
      existingAdmin.password = hashedPassword
      existingAdmin.role = newAdmin.role
      await existingAdmin.save()
      
      console.log("✅ Admin updated successfully!")
    } else {
      console.log("📝 Creating new admin account...\n")
      
      // Hash password
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(newAdmin.password, salt)
      
      // Create new admin
      await Admin.create({
        email: newAdmin.email,
        password: hashedPassword,
        role: newAdmin.role
      })
      
      console.log("✅ Admin created successfully!")
    }

    console.log("\n📋 Admin Details:")
    console.log("   Email:", newAdmin.email)
    console.log("   Password:", newAdmin.password)
    console.log("   Role:", newAdmin.role)
    
    console.log("\n🎉 Seeding completed successfully!")
    console.log("\n💡 You can now login with these credentials:")
    console.log(`   Email: ${newAdmin.email}`)
    console.log(`   Password: ${newAdmin.password}`)

  } catch (error) {
    console.error("❌ Error seeding admin:", error.message)
    console.error(error)
  } finally {
    // Close connection
    await mongoose.connection.close()
    console.log("\n🔌 Database connection closed")
    process.exit(0)
  }
}

// Run the seeding
seedAdmin()
