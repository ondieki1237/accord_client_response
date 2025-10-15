# Accord Medical Supplies API Endpoints

This document provides an overview of the API endpoints used by the Accord Medical Supplies Client Feedback Form application.

## Base URL
```
http://localhost:5000/api
```

## Authentication Endpoints

### Login
- **Endpoint**: `/auth/login`
- **Method**: `POST`
- **Description**: Authenticates an admin user and returns admin data with an access token
- **Request Body**:
  ```json
  {
    "email": "admin@example.com",
    "password": "admin123"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "token": "jwt_access_token",
    "admin": {
      "id": "admin_id",
      "email": "admin@example.com",
      "role": "admin"
    }
  }
  ```

### Get Current Admin
- **Endpoint**: `/auth/me`
- **Method**: `GET`
- **Description**: Retrieves the current authenticated admin's information
- **Headers**: 
  - `Authorization: Bearer jwt_access_token`
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "id": "admin_id",
      "email": "admin@example.com",
      "role": "admin"
    }
  }
  ```

## Feedback Endpoints

### Submit Feedback
- **Endpoint**: `/feedback`
- **Method**: `POST`
- **Description**: Submits client feedback to the server (public access)
- **Request Body**:
  ```json
  {
    "date": "2025-10-15T10:00:00.000Z",
    "clientName": "John Doe",
    "facility": "Metro Hospital",
    "salesRep": "Jane Smith",
    "productQuality": 5,
    "deliveryTimelines": 4,
    "customerService": 5,
    "challenges": "No major challenges",
    "suggestions": "Consider expanding product range",
    "recommendationLikelihood": 9,
    "clientSignature": "base64_encoded_signature_data",  // Optional
    "salesRepSignature": "base64_encoded_signature_data"  // Optional
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Feedback submitted successfully",
    "data": {
      "_id": "feedback_id",
      "date": "2025-10-15T10:00:00.000Z",
      "clientName": "John Doe",
      "facility": "Metro Hospital",
      "salesRep": "Jane Smith",
      "productQuality": 5,
      "deliveryTimelines": 4,
      "customerService": 5,
      "challenges": "No major challenges",
      "suggestions": "Consider expanding product range",
      "recommendationLikelihood": 9,
      "clientSignature": "https://res.cloudinary.com/...", // If provided
      "salesRepSignature": "https://res.cloudinary.com/...", // If provided
      "status": "pending",
      "createdAt": "2025-10-15T12:34:56.789Z",
      "updatedAt": "2025-10-15T12:34:56.789Z"
    }
  }
  ```

### Get All Feedback
- **Endpoint**: `/feedback`
- **Method**: `GET`
- **Description**: Retrieves all feedback submissions (admin only)
- **Headers**: 
  - `Authorization: Bearer jwt_access_token`
- **Query Parameters**:
  - `page` (optional, default: 1) - Page number for pagination
  - `limit` (optional, default: 10) - Number of items per page
  - `status` (optional) - Filter by status (pending, reviewed, archived)
  - `salesRep` (optional) - Filter by sales representative name
  - `facility` (optional) - Filter by facility name
- **Response**:
  ```json
  {
    "success": true,
    "data": [
      {
        "_id": "feedback_id_1",
        "date": "2025-10-15T10:00:00.000Z",
        "clientName": "John Doe",
        "facility": "Metro Hospital",
        "salesRep": "Jane Smith",
        "productQuality": 5,
        "deliveryTimelines": 4,
        "customerService": 5,
        "challenges": "No major challenges",
        "suggestions": "Consider expanding product range",
        "recommendationLikelihood": 9,
        "clientSignature": "https://res.cloudinary.com/...",
        "salesRepSignature": "https://res.cloudinary.com/...",
        "status": "pending",
        "createdAt": "2025-10-15T12:34:56.789Z",
        "updatedAt": "2025-10-15T12:34:56.789Z"
      },
      // More feedback items
    ],
    "totalPages": 5,
    "currentPage": 1,
    "total": 50
  }
  ```

### Get Feedback Statistics
- **Endpoint**: `/feedback/stats`
- **Method**: `GET`
- **Description**: Retrieves feedback statistics (admin only)
- **Headers**: 
  - `Authorization: Bearer jwt_access_token`
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "totalFeedback": 50,
      "pendingFeedback": 20,
      "reviewedFeedback": 30,
      "averageRatings": {
        "avgProductQuality": 4.5,
        "avgDeliveryTimelines": 4.2,
        "avgCustomerService": 4.7,
        "avgRecommendation": 8.5
      }
    }
  }
  ```

### Get Feedback by ID
- **Endpoint**: `/feedback/:id`
- **Method**: `GET`
- **Description**: Retrieves a specific feedback submission by ID (admin only)
- **Headers**: 
  - `Authorization: Bearer jwt_access_token`
- **Parameters**: 
  - `id` - The ID of the feedback to retrieve
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "_id": "feedback_id",
      "date": "2025-10-15T10:00:00.000Z",
      "clientName": "John Doe",
      "facility": "Metro Hospital",
      "salesRep": "Jane Smith",
      "productQuality": 5,
      "deliveryTimelines": 4,
      "customerService": 5,
      "challenges": "No major challenges",
      "suggestions": "Consider expanding product range",
      "recommendationLikelihood": 9,
      "clientSignature": "https://res.cloudinary.com/...",
      "salesRepSignature": "https://res.cloudinary.com/...",
      "status": "pending",
      "createdAt": "2025-10-15T12:34:56.789Z",
      "updatedAt": "2025-10-15T12:34:56.789Z"
    }
  }
  ```

### Update Feedback Status
- **Endpoint**: `/feedback/:id`
- **Method**: `PATCH`
- **Description**: Updates the status of a feedback submission (admin only)
- **Headers**: 
  - `Authorization: Bearer jwt_access_token`
- **Parameters**:
  - `id` - The ID of the feedback to update
- **Request Body**:
  ```json
  {
    "status": "reviewed" // Options: "pending", "reviewed", "archived"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Feedback status updated",
    "data": {
      "_id": "feedback_id",
      "status": "reviewed",
      // Other feedback fields
    }
  }
  ```

### Delete Feedback
- **Endpoint**: `/feedback/:id`
- **Method**: `DELETE`
- **Description**: Deletes a feedback submission (admin only)
- **Headers**: 
  - `Authorization: Bearer jwt_access_token`
- **Parameters**:
  - `id` - The ID of the feedback to delete
- **Response**:
  ```json
  {
    "success": true,
    "message": "Feedback deleted successfully"
  }
  ```

## Error Handling

All endpoints return appropriate HTTP status codes:
- `200 OK` - Request successful
- `201 Created` - Resource created successfully
- `400 Bad Request` - Invalid request parameters
- `401 Unauthorized` - Authentication required or invalid credentials
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server-side error

Error responses follow this format:
```json
{
  "success": false,
  "message": "Error message description",
  "error": "Detailed error information (development only)"
}
```

## Notes for Development

1. The API is configured to run on `localhost:5000` for local development
2. CORS is enabled to allow requests from the client application running on `localhost:3000` and `localhost:5173`
3. In production, CORS allows only requests from `https://accordmedical.co.ke` and `https://www.accordmedical.co.ke`
4. All feedback management endpoints require admin authentication
5. Feedback submission endpoint is public (no authentication required)
6. Signatures are now optional in the feedback submission