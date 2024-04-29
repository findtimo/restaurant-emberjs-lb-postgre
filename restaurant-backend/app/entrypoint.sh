#!/bin/bash
# Exit script in case of error
set -e

# Run the script to create tables and insert initial data
echo "Running create-table.js to initialize database..."
node create-table.js

# Start the main application
echo "Starting LoopBack application..."
npm start
