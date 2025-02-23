# Backend
FROM python:3.9
WORKDIR /app
COPY backend/ /app
RUN pip install -r requirements.txt
CMD ["python", "app.py"]

# Frontend
# Use Node.js image to run the frontend build
FROM node:18

# Set working directory in container
WORKDIR /frontend

# Copy frontend src files (including package.json)
COPY frontend/src/package.json /frontend/package.json
COPY frontend/src/ /frontend/src/

# Install dependencies and build the React app
RUN npm install && npm run build

# Serve the app using npx serve
CMD ["node", "server.js"]
