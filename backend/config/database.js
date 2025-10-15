import mongoose from "mongoose"

const connectDB = async () => {
  const rawUri = process.env.MONGODB_URI

  // If the env var looks like the example (contains placeholders) or is missing,
  // fall back to a local MongoDB instance for development to avoid DNS SRV issues.
  let uri = rawUri
  if (!uri || uri.includes('<') || uri.includes('your-db-name')) {
    console.warn('\n[WARN] MONGODB_URI is missing or still contains example placeholders.')
    console.warn('Falling back to local MongoDB at mongodb://127.0.0.1:27017/accord for development.\n')
    uri = 'mongodb://127.0.0.1:27017/accord'
  }

  try {
    // mongoose 6+ enables the proper options by default; passing deprecated options
    // to the underlying driver produces warnings. Keep the call simple.
    const conn = await mongoose.connect(uri)

    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    // Provide a clearer message for DNS SRV failures which commonly happen when
    // using a placeholder mongodb+srv:// URI or when SRV lookups are blocked.
    if (error && error.message && error.message.includes('ENOTFOUND') && error.message.includes('_mongodb._tcp')) {
      console.error('\n[ERROR] DNS SRV lookup failed for the provided mongodb+srv URI.')
      console.error('This often means the MONGODB_URI is a placeholder (contains <user> or <password>)')
      console.error('or your environment cannot resolve SRV DNS records for Atlas.\n')
      console.error('Please update backend/.env with a valid connection string, or run a local MongoDB and restart the server.')
    }

    console.error(`Error connecting to MongoDB: ${error.message}`)
    process.exit(1)
  }
}

export default connectDB
