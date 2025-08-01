#!/bin/bash
set -e
PROJECT_DIR="/home/kerit/projects/kerit-app"
LOG_FILE="/home/kerit/logs/deploy.log"

log() { echo "$(date): $1" | tee -a $LOG_FILE; }

log "Starting deployment..."
cd $PROJECT_DIR

log "Creating backup..."
cp -r $PROJECT_DIR $PROJECT_DIR.backup.$(date +%Y%m%d_%H%M%S)

log "Pulling latest changes from GitHub..."
git pull origin main

log "Installing all dependencies (including dev dependencies for build)..."
npm install

log "Building application..."
npm run build

log "Updating database schema..."
npm run db:push

log "Restarting application..."
pm2 reload kerit-app

sleep 10
if pm2 list | grep -q "kerit-app.*online"; then
    log "Deployment successful!"
    # Keep only last 5 backups
    ls -t $PROJECT_DIR.backup.* | tail -n +6 | xargs -r rm -rf
else
    log "Deployment failed! Rolling back..."
    pm2 stop kerit-app
    rm -rf $PROJECT_DIR
    mv $(ls -t $PROJECT_DIR.backup.* | head -1) $PROJECT_DIR
    cd $PROJECT_DIR
    pm2 start kerit-app
    exit 1
fi

log "Deployment completed successfully!"