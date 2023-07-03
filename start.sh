#!/bin/bash

# Save the current working directory
PROJECT_DIR=$(pwd)

# start the nextjs frontend
cd "$PROJECT_DIR/frontend" && npm run dev &

# start the django backend
cd "$PROJECT_DIR/backend" && source venv/bin/activate && python manage.py runserver


