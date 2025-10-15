# Accord Medical Supplies API Endpoints Summary

This document provides an overview of the API endpoints used by the Accord Medical Supplies Client Feedback Form application.

## Base URL
```
http://localhost:5000/api
```

## Authentication Endpoints

### Login
- **Endpoint**: `/auth/login`
- **Method**: `POST`
- **Description**: Authenticates a user and returns user data with an access token
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "userpassword"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "user": {
      "name": "User Name",
      "email": "user@example.com",
      "role": "client|admin"
    },
    "token": "jwt_access_token"
  }
  ```

## Feedback Endpoints

### Submit Feedback
- **Endpoint**: `/feedback`
- **Method**: `POST`
- **Description**: Submits client feedback to the server
- **Request Body**:
  ```json
  {
    "date": "2025-10-15",
    "clientName": "John Doe",
    "facility": "Metro Hospital",
    "serviceType": "purchase",
    "productQuality": 5,
    "deliveryTimelines": 4,
    "customerService": 5,
    "challenges": "No major challenges",
    "suggestions": "Consider expanding product range",
    "recommendationLikelihood": 9,
    "submittedAt": "2025-10-15T12:34:56.789Z"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Feedback submitted successfully",
    "id": "feedback_id",
    "timestamp": "2025-10-15T12:34:56.789Z"
  }
  ```

### Get All Feedback
- **Endpoint**: `/feedback`
- **Method**: `GET`
- **Description**: Retrieves all feedback submissions
- **Response**:
  ```json
  {
    "success": true,
    "feedback": [
      {
        "id": "feedback_id_1",
        "clientName": "John Doe",
        "facility": "Metro Hospital",
        "date": "2025-10-15",
        "submittedAt": "2025-10-15T12:34:56.789Z",
        "... other feedback fields": "values"
      },
      {
        "id": "feedback_id_2",
        "... other feedback fields": "values"
      }
    ]
  }
  ```

### Get Feedback by ID
- **Endpoint**: `/feedback/:id`
- **Method**: `GET`
- **Description**: Retrieves a specific feedback submission by ID
- **Parameters**: 
  - `id` - The ID of the feedback to retrieve
- **Response**:
  ```json
  {
    "success": true,
    "feedback": {
      "id": "feedback_id",
      "clientName": "John Doe",
      "facility": "Metro Hospital",
      "date": "2025-10-15",
      "serviceType": "purchase",
      "productQuality": 5,
      "deliveryTimelines": 4,
      "customerService": 5,
      "challenges": "No major challenges",
      "suggestions": "Consider expanding product range",
      "recommendationLikelihood": 9,
      "submittedAt": "2025-10-15T12:34:56.789Z"
    }
  }
  ```

## Error Handling

All endpoints return appropriate HTTP status codes:
- `200 OK` - Request successful
- `400 Bad Request` - Invalid request parameters
- `401 Unauthorized` - Authentication required or invalid credentials
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server-side error

Error responses follow this format:
```json
{
  "success": false,
  "error": "Error message description",
  "status": 400
}
```

## Notes for Development

1. The API is configured to run on `localhost:5000` for local development
2. CORS is enabled to allow requests from the client application running on `localhost:3000`
3. Authentication endpoints require valid credentials
4. Feedback endpoints may require authentication depending on the server configuration