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
- **Description**: Authenticates an admin user and returns user data with an access token
- **Request Body**:
  ```json
  {
    "email": "admin@example.com",
    "password": "adminpassword"
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
- **Description**: Returns the currently authenticated admin's information
- **Headers**:
  ```
  Authorization: Bearer jwt_access_token
  ```
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

### Submit Feedback (Public)
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
    "clientSignature": "base64_encoded_signature_data",
    "salesRepSignature": "base64_encoded_signature_data"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Feedback submitted successfully",
    "data": {
      "id": "feedback_id",
      "date": "2025-10-15T00:00:00.000Z",
      "clientName": "John Doe",
      "facility": "Metro Hospital",
      "serviceType": "purchase",
      ...
    }
  }
  ```

### Get All Feedback (Admin)
- **Endpoint**: `/feedback`
- **Method**: `GET`
- **Description**: Retrieves all feedback submissions with pagination and filtering
- **Headers**:
  ```
  Authorization: Bearer jwt_access_token
  ```
- **Query Parameters**:
  - `page`: Page number (default: 1)
  - `limit`: Items per page (default: 10)
  - `status`: Filter by status (pending, reviewed, archived)
  - `serviceType`: Filter by service type (service, purchase, maintenance)
  - `facility`: Filter by facility name (partial match)
- **Response**:
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "feedback_id",
        "date": "2025-10-15T00:00:00.000Z",
        "clientName": "John Doe",
        "facility": "Metro Hospital",
        "serviceType": "purchase",
        ...
      }
    ],
    "totalPages": 5,
    "currentPage": 1,
    "total": 48
  }
  ```

### Get Feedback by ID (Admin)
- **Endpoint**: `/feedback/:id`
- **Method**: `GET`
- **Description**: Retrieves a specific feedback submission by ID
- **Headers**:
  ```
  Authorization: Bearer jwt_access_token
  ```
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "id": "feedback_id",
      "date": "2025-10-15T00:00:00.000Z",
      "clientName": "John Doe",
      "facility": "Metro Hospital",
      "serviceType": "purchase",
      ...
    }
  }
  ```

### Update Feedback Status (Admin)
- **Endpoint**: `/feedback/:id`
- **Method**: `PATCH`
- **Description**: Updates the status of a feedback submission
- **Headers**:
  ```
  Authorization: Bearer jwt_access_token
  ```
- **Request Body**:
  ```json
  {
    "status": "reviewed"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Feedback status updated",
    "data": {
      "id": "feedback_id",
      "status": "reviewed",
      ...
    }
  }
  ```

### Delete Feedback (Admin)
- **Endpoint**: `/feedback/:id`
- **Method**: `DELETE`
- **Description**: Deletes a feedback submission and its associated files
- **Headers**:
  ```
  Authorization: Bearer jwt_access_token
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Feedback deleted successfully"
  }
  ```

### Get Feedback Statistics (Admin)
- **Endpoint**: `/feedback/stats`
- **Method**: `GET`
- **Description**: Returns aggregated statistics about feedback submissions
- **Headers**:
  ```
  Authorization: Bearer jwt_access_token
  ```
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "totalFeedback": 48,
      "pendingFeedback": 12,
      "reviewedFeedback": 36,
      "averageRatings": {
        "avgProductQuality": 4.2,
        "avgDeliveryTimelines": 3.8,
        "avgCustomerService": 4.5,
        "avgRecommendation": 8.7
      }
    }
  }
  ```

## Error Handling

All endpoints return appropriate HTTP status codes:
- `200 OK` - Request successful
- `201 Created` - Resource successfully created
- `400 Bad Request` - Invalid request parameters
- `401 Unauthorized` - Authentication required or invalid credentials
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server-side error

Error responses follow this format:
```json
{
  "success": false,
  "message": "Error message description",
  "error": "Detailed error information (only in development)"
}
```

## Notes for Development

1. The API is configured to run on port 5000 for local development
2. CORS is enabled to allow requests from the frontend application
3. Signatures (clientSignature and salesRepSignature) are now optional fields
4. The serviceType field must be one of: "service", "purchase", "maintenance"