# Render Deployment Configuration

## Required Environment Variables

Go to your Render dashboard → Your backend service → **Environment** tab and add/update these variables:

### Core Settings
```
NODE_ENV=production
PORT=5000
```

### Database
```
MONGODB_URI=mongodb+srv://bellarinseth_db_user:5RWVgMqZ1CxeybBe@cluster0.8aeu9sk.mongodb.net/accord
```

### JWT Configuration
```
JWT_SECRET=<strong-random-secret-at-least-32-chars>
JWT_EXPIRE=7d
```

### Admin Credentials
```
ADMIN_EMAIL=customerservice@accordmedical.co.ke
ADMIN_PASSWORD=customer2026
```

### Email Configuration (Optional - for notifications)
```
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM="Accord Medical <no-reply@accordmedical.co.ke>"
```

### Cloudinary (Optional - for signature storage)
```
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Rate Limiting
```
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX=100
```

## Important Notes

1. **JWT_SECRET**: Should be a strong random string in production. Generate one with:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

2. **Admin Account**: The admin account will be automatically created on first deployment if it doesn't exist.

3. **Email Settings**: If you don't configure email, notifications will fail silently but won't break the app.

4. **Cloudinary**: If not configured, signature uploads will fail but won't break submissions.

## Current Production Credentials

**Admin Login:**
- Email: `customerservice@accordmedical.co.ke`
- Password: `customer2026`

**Important**: Change these in production before going live!

## Deployment Status

After pushing code changes:
1. Render will automatically detect the push
2. It will rebuild and redeploy (takes 2-5 minutes)
3. Check logs at: https://dashboard.render.com → Your service → Logs

## Testing Production

After deployment completes, test with:
```bash
node test-new-admin.js
```

This will verify:
- API is accessible
- Admin login works
- JWT tokens are generated correctly

## Troubleshooting

### 500 Error on Login
- Check Render logs for JWT_EXPIRE or JWT_SECRET errors
- Verify all required environment variables are set
- Redeploy if needed

### 401 Error on Login
- Admin account doesn't exist in database
- Run `node backend/seed-admin.js` to create it
- Or check credentials match environment variables

### CORS Errors
- Backend is configured to accept all origins (`"*"`)
- Should work from any frontend URL
