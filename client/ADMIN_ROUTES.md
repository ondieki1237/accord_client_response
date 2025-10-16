# Admin Routes - Accord Medical Supplies Feedback System

## Overview
The client application now includes admin routes for viewing submitted feedback responses.

## Routes

### Public Routes
- **/** - Home page with the feedback form (public access)

### Admin Routes
- **/admin** - Admin login page
- **/admin/dashboard** - Admin dashboard to view all feedback submissions (requires authentication)

## Usage

### 1. Start the Backend
```bash
cd backend
npm install
npm run dev
```
Backend runs on http://localhost:5000

### 2. Start the Frontend
```bash
cd client
npm install
npm run dev
```
Frontend runs on http://localhost:5173 (Vite default) or the port shown in terminal

### 3. Access Admin Panel

#### Login
1. Navigate to http://localhost:5173/admin
2. Enter admin credentials:
   - Email: The value from `ADMIN_EMAIL` in backend `.env`
   - Password: The value from `ADMIN_PASSWORD` in backend `.env`
3. Click "Login"

#### View Feedback
After successful login, you'll be redirected to http://localhost:5173/admin/dashboard where you can:
- View all submitted feedback responses
- See detailed ratings (Product Quality, Delivery, Customer Service, Recommendation)
- Read client challenges and suggestions
- View signatures (if provided)
- Navigate through pages (10 items per page)
- Refresh the list
- Logout

## Features

### Admin Login Page
- Secure login with email and password
- Error handling for invalid credentials
- Token-based authentication
- Redirects to dashboard on success

### Admin Dashboard
- Displays all feedback submissions in reverse chronological order
- Shows key information:
  - Client name and facility
  - Service type (service/purchase/maintenance)
  - Submission date
  - All ratings with color-coded indicators:
    - Green: 80%+ (Excellent)
    - Yellow: 60-79% (Good)
    - Red: Below 60% (Needs improvement)
  - Challenges and suggestions (if provided)
  - Client and sales rep signatures (if provided)
- Pagination support
- Refresh button to reload data
- Secure logout

## Authentication Flow
1. User logs in at `/admin`
2. Backend validates credentials and returns JWT token
3. Token is stored in localStorage
4. All API requests to `/api/feedback` include token in Authorization header
5. If token is invalid/expired, user is redirected back to login

## API Integration
The admin dashboard uses these backend endpoints:
- `POST /api/auth/login` - Authenticate admin
- `GET /api/feedback?page=1&limit=10` - Get paginated feedback list (requires token)

## Notes
- Admin credentials are set in `backend/.env` file
- JWT tokens are stored in browser localStorage
- Tokens expire based on `JWT_EXPIRE` setting in backend
- Port 3000 mentioned in your request will be the Vite dev server port (typically 5173, but configurable)

## Troubleshooting

### "Failed to load feedback"
- Ensure backend is running on port 5000
- Check that MONGODB_URI is configured in backend `.env`
- Verify admin token is valid (try logging out and back in)

### "Login failed"
- Verify ADMIN_EMAIL and ADMIN_PASSWORD in backend `.env`
- Check backend console for error messages
- Ensure backend server is running

### CORS errors
- Backend CORS is configured for localhost:3000 and localhost:5173
- If using different port, update backend `server.js` CORS config
