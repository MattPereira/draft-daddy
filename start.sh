#!/bin/bash

# Save the current working directory
PROJECT_DIR=$(pwd)

# Start the nextjs frontend
cd "$PROJECT_DIR/frontend" && npm run dev &
# Save the PID of the frontend process
FRONTEND_PID=$!

# Go back to the original working directory
cd "$PROJECT_DIR"

# Start the django backend
cd "$PROJECT_DIR/backend" && source venv/bin/activate && python manage.py runserver &
# Save the PID of the backend process
BACKEND_PID=$!

# Define cleanup procedure
cleanup() {
    echo "Stopping servers..."
    kill $FRONTEND_PID
    kill $BACKEND_PID
}

# Set the cleanup procedure to run when the script receives an interrupt signal (e.g., when you press Ctrl+C)
trap cleanup INT

# Wait for either server to exit; this should keep your script running until you press Ctrl+C
wait $FRONTEND_PID $BACKEND_PID



