# Accord Medical Supplies - Backend API

Backend API for the Client Feedback Form system.

## Features

- RESTful API with Express.js
- MongoDB database with Mongoose ODM
- JWT authentication for admin access
- Cloudinary integration for signature storage
- Email notifications via Brevo SMTP
- Rate limiting and security middleware
- Input validation and error handling

## Installation

1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Configure environment variables:
   - Copy `.env` file and update values as needed

3. Start the server:
\`\`\`bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
\`\`\`

## API Endpoints

### Public Endpoints

- `POST /api/feedback` - Submit new feedback

### Protected Endpoints (Admin)

- `POST /api/auth/login` - Admin login
- `GET /api/auth/me` - Get current admin
- `GET /api/feedback` - Get all feedback (with pagination)
- `GET /api/feedback/stats` - Get feedback statistics
- `GET /api/feedback/:id` - Get single feedback
- `PATCH /api/feedback/:id` - Update feedback status
- `DELETE /api/feedback/:id` - Delete feedback

## Default Admin Credentials

- Email: bellarinseth@gmail.com
- Password: admin123

**Important:** Change these credentials in production!

## Environment Variables

See `.env` file for all required environment variables.

## Database Schema

### Feedback Model
- date, clientName, facility, serviceType (service/purchase/maintenance)
- productQuality, deliveryTimelines, customerService (1-5 ratings)
- challenges, suggestions (text)
- recommendationLikelihood (1-10 rating)
- clientSignature, salesRepSignature (optional Cloudinary URLs)
- status (pending/reviewed/archived)

## Security Features

- Helmet.js for HTTP headers security
- Rate limiting (100 requests per 15 minutes)
- JWT authentication
- Password hashing with bcrypt
- CORS configuration
- Input validation

## Email Notifications

Automatic email notifications are sent to the admin when new feedback is submitted.
