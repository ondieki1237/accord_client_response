import fetch from 'node-fetch';

// API base URL
const API_BASE = 'http://127.0.0.1:5000/api';

// Test the updated feedback submission endpoint
async function testSubmitFeedback() {
  console.log('Testing feedback submission with serviceType...');
  
  const feedbackData = {
    date: new Date(),
    clientName: 'Test Client',
    facility: 'Test Hospital',
    serviceType: 'purchase', // New field instead of salesRep
    productQuality: 4,
    deliveryTimelines: 5,
    customerService: 5,
    challenges: 'No challenges',
    suggestions: 'No suggestions',
    recommendationLikelihood: 9
  };

  try {
    const response = await fetch(`${API_BASE}/feedback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(feedbackData)
    });

    const result = await response.json();
    console.log('Response status:', response.status);
    console.log('Response body:', JSON.stringify(result, null, 2));
    
    if (response.ok) {
      console.log('✅ Test passed: Feedback submitted successfully with serviceType field');
      return result.data._id; // Return the ID for future tests
    } else {
      console.log('❌ Test failed: Could not submit feedback');
      return null;
    }
  } catch (error) {
    console.error('Error during test:', error);
    return null;
  }
}

// Test admin login to get access token
async function testAdminLogin() {
  console.log('\nTesting admin login...');
  
  try {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'admin@example.com',
        password: 'admin123'
      })
    });

    const result = await response.json();
    console.log('Response status:', response.status);
    
    if (response.ok) {
      console.log('✅ Test passed: Admin login successful');
      return result.token;
    } else {
      console.log('❌ Test failed: Admin login failed');
      console.log('Response:', JSON.stringify(result, null, 2));
      return null;
    }
  } catch (error) {
    console.error('Error during admin login test:', error);
    return null;
  }
}

// Test fetching all feedback with serviceType filter
async function testGetAllFeedback(token) {
  console.log('\nTesting get all feedback with serviceType filter...');
  
  if (!token) {
    console.log('❌ Test skipped: No authentication token available');
    return;
  }
  
  try {
    const response = await fetch(`${API_BASE}/feedback?serviceType=purchase`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const result = await response.json();
    console.log('Response status:', response.status);
    
    if (response.ok) {
      console.log('✅ Test passed: Successfully fetched feedback with serviceType filter');
      console.log(`Total feedback matching filter: ${result.data.length}`);
    } else {
      console.log('❌ Test failed: Could not fetch feedback');
      console.log('Response:', JSON.stringify(result, null, 2));
    }
  } catch (error) {
    console.error('Error during get feedback test:', error);
  }
}

// Run tests
async function runTests() {
  console.log('Starting API tests for serviceType changes...');
  const feedbackId = await testSubmitFeedback();
  const token = await testAdminLogin();
  
  if (token) {
    await testGetAllFeedback(token);
  }
  
  console.log('\nTests completed!');
}

runTests();