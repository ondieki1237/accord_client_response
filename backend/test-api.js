// Test script for API endpoints
import fetch from 'node-fetch';

const baseUrl = 'http://127.0.0.1:5000/api';
let token = '';

// Test feedback submission (public)
async function testSubmitFeedback() {
  try {
    const response = await fetch(`${baseUrl}/feedback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        date: '2025-10-15',
        clientName: 'Test User',
        facility: 'Test Hospital',
        salesRep: 'Sales Person',
        productQuality: 4,
        deliveryTimelines: 5,
        customerService: 5,
        challenges: 'None',
        suggestions: 'All good',
        recommendationLikelihood: 9,
      }),
    });

    const data = await response.json();
    console.log('Submit Feedback Response:', data);
    return data.data?._id; // Return the feedback ID for later use
  } catch (error) {
    console.error('Error submitting feedback:', error);
  }
}

// Test admin login
async function testAdminLogin() {
  try {
    const response = await fetch(`${baseUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'admin@example.com',
        password: 'admin123',
      }),
    });

    const data = await response.json();
    console.log('Admin Login Response:', data);
    
    if (data.token) {
      token = data.token;
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error logging in:', error);
    return false;
  }
}

// Test get all feedback (admin only)
async function testGetAllFeedback() {
  if (!token) {
    console.log('No token available. Please login first.');
    return;
  }

  try {
    const response = await fetch(`${baseUrl}/feedback`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();
    console.log('Get All Feedback Response:', data);
  } catch (error) {
    console.error('Error getting feedback:', error);
  }
}

// Test get feedback by ID (admin only)
async function testGetFeedbackById(id) {
  if (!token || !id) {
    console.log('No token or feedback ID available.');
    return;
  }

  try {
    const response = await fetch(`${baseUrl}/feedback/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();
    console.log('Get Feedback by ID Response:', data);
  } catch (error) {
    console.error('Error getting feedback by ID:', error);
  }
}

// Test get feedback stats (admin only)
async function testGetFeedbackStats() {
  if (!token) {
    console.log('No token available. Please login first.');
    return;
  }

  try {
    const response = await fetch(`${baseUrl}/feedback/stats`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();
    console.log('Get Feedback Stats Response:', data);
  } catch (error) {
    console.error('Error getting feedback stats:', error);
  }
}

// Run tests
async function runTests() {
  console.log('Testing API Endpoints...');
  
  // Test feedback submission (public)
  console.log('\n1. Testing feedback submission (public)...');
  const feedbackId = await testSubmitFeedback();
  
  // Test admin login
  console.log('\n2. Testing admin login...');
  const loggedIn = await testAdminLogin();
  
  if (loggedIn) {
    // Test get all feedback
    console.log('\n3. Testing get all feedback (admin only)...');
    await testGetAllFeedback();
    
    // Test get feedback by ID
    if (feedbackId) {
      console.log('\n4. Testing get feedback by ID (admin only)...');
      await testGetFeedbackById(feedbackId);
    }
    
    // Test get feedback stats
    console.log('\n5. Testing get feedback stats (admin only)...');
    await testGetFeedbackStats();
  }
  
  console.log('\nAPI endpoint testing complete!');
}

// Run the tests
runTests();