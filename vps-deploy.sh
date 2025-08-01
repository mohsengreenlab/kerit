#!/bin/bash
# VPS Deployment Script for Booking Validation Fix

echo "Uploading fixed schema.ts to VPS..."
scp shared/schema.ts kerit@your-vps-ip:/home/kerit/projects/kerit-app/shared/schema.ts

echo "Building application on VPS..."
ssh kerit@your-vps-ip "cd /home/kerit/projects/kerit-app && npm run build"

echo "Restarting PM2 processes..."
ssh kerit@your-vps-ip "cd /home/kerit/projects/kerit-app && pm2 restart ecosystem.config.json"

echo "Testing booking API..."
ssh kerit@your-vps-ip 'curl -X POST http://localhost:3001/api/booking-consultation \
  -H "Content-Type: application/json" \
  -d '"'"'{
    "name":"VPS Test",
    "email":"test@example.com",
    "service":"email-marketing",
    "message":"Testing fixed validation"
  }'"'"' -v'

echo "Deployment complete!"