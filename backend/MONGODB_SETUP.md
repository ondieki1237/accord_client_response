# MongoDB Setup Instructions for Development

This document provides instructions for setting up MongoDB for the Accord Customer Response backend.

## Option 1: Using Docker Compose (Recommended)

The project includes a `docker-compose.yml` file that sets up MongoDB and Mongo Express (web UI) automatically.

```bash
# Start MongoDB and Mongo Express
docker-compose up -d

# Verify containers are running
docker-compose ps

# View MongoDB logs
docker-compose logs -f mongodb

# Access Mongo Express UI at http://localhost:8081
```

## Option 2: Install MongoDB locally

```bash
# Update package lists
sudo apt update

# Install MongoDB Community Edition
sudo apt install -y mongodb
# Start MongoDB service
sudo systemctl start mongodb

# Enable MongoDB to start on boot
sudo systemctl enable mongodb

# Check MongoDB service status
sudo systemctl status mongodb
```

## Option 2: Use Docker for MongoDB

If you have Docker installed, this is the easiest way to run MongoDB without installing it system-wide.

```bash
# Create a directory for MongoDB data
mkdir -p ~/mongodb-data

# Run MongoDB container
docker run -d --name accord-mongodb -p 27017:27017 -v ~/mongodb-data:/data/db mongo:6.0

# Check if container is running
docker ps

# To stop MongoDB container
# docker stop accord-mongodb

# To start it again later
# docker start accord-mongodb
```

## Option 3: MongoDB Atlas (Cloud)

1. Create a MongoDB Atlas account at https://www.mongodb.com/cloud/atlas
2. Create a new cluster (the free tier is sufficient for development)
3. Add your IP to the network access list
4. Create a database user
5. Get your connection string
6. Add your connection string to .env file:

```
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/accord?retryWrites=true&w=majority
```

## Troubleshooting

### "ECONNREFUSED 127.0.0.1:27017"
This means MongoDB is not running locally. Either start the MongoDB service or use Docker.

### "querySrv ENOTFOUND _mongodb._tcp.cluster0.mongodb.net"
Your MongoDB URI contains placeholders or DNS SRV lookup is failing. Update your `.env` file with a valid connection string.

### Issues with Cloudinary Uploads
If you're setting up the project for the first time, ensure the following environment variables are set in your `.env` file:
```
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

