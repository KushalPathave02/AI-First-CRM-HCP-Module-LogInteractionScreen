# Deploying to Render

This project is structured for easy deployment on [Render](https://render.com/).

## Prerequisites
- A Render account.
- MongoDB Atlas cluster (URI already in `.env`).
- Groq API Key.

## Deployment Steps

### 1. Backend (FastAPI)
- **Service Type**: Web Service
- **Runtime**: Python
- **Build Command**: `pip install -r requirements.txt`
- **Start Command**: `gunicorn -w 4 -k uvicorn.workers.UvicornWorker app.main:app --bind 0.0.0.0:$PORT`
- **Environment Variables**:
  - `MONGO_URI`: (From your .env)
  - `GROQ_API_KEY`: (Your Groq Key)
  - `DATABASE_NAME`: `crm_ai`

### 2. Frontend (React + Vite)
- **Service Type**: Static Site
- **Build Command**: `npm install && npm run build`
- **Publish Directory**: `dist`
- **Environment Variables**:
  - `VITE_API_URL`: The URL of your deployed Backend service (e.g., `https://your-backend.onrender.com`)

## Important Note
Ensure your Backend service is fully deployed before setting the `VITE_API_URL` in the Frontend settings.
