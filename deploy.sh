#!/bin/bash
# Deploy Calculus Website to calculus-web VM
# VM: calculus-web | Zone: us-east1-b | IP: 34.148.8.51 (static)
# Usage: ./deploy.sh [--dry-run]

set -euo pipefail

# Configuration
REMOTE_HOST="calculus-web"
REMOTE_USER="crypticassassin"
REMOTE_DIR="/var/www/html"  # Nginx default doc root - update if different
LOCAL_DIR="/workspaces/Calculus-Website"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

DRY_RUN=""
if [[ "${1:-}" == "--dry-run" ]]; then
    DRY_RUN="--dry-run"
    echo -e "${YELLOW}=== DRY RUN MODE ===${NC}"
fi

echo -e "${GREEN}Deploying Calculus Website to ${REMOTE_HOST} (34.148.8.51)${NC}"
echo "From: ${LOCAL_DIR}"
echo "To:   ${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_DIR}"
echo ""

# Rsync website files to VM
# Excludes: git files, deploy script, dev files, chatbot server
rsync -avz --delete $DRY_RUN \
    --exclude='.git/' \
    --exclude='.gitignore' \
    --exclude='deploy.sh' \
    --exclude='.devcontainer/' \
    --exclude='node_modules/' \
    --exclude='__pycache__/' \
    --exclude='.vscode/' \
    --exclude='chatbot/server.py' \
    --exclude='chatbot/__pycache__/' \
    --exclude='README.md' \
    -e "ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -i ~/.ssh/calculus_web" \
    "${LOCAL_DIR}/" \
    "${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_DIR}/"

echo ""
if [[ -z "$DRY_RUN" ]]; then
    echo -e "${GREEN}✓ Deployment complete!${NC}"
    echo -e "Site live at: http://34.148.8.51/"
else
    echo -e "${YELLOW}Dry run complete. Run without --dry-run to deploy.${NC}"
fi
