# AI-First CRM HCP Module – Log Interaction Screen

An intelligent HCP (Healthcare Provider) interaction logger powered by FastAPI, React, Redux, LangGraph, and Groq LLM.

## Features
- **AI-Driven Form Filling**: The AI Assistant extracts entities from chat and automatically populates the interaction form.
- **Split-Screen UI**: Side-by-side view of the Interaction Form and AI Chat Assistant.
- **Real-time Synchronization**: State managed by Redux ensures the form stays in sync with AI extractions.
- **LangGraph Orchestration**: Robust agentic workflow for handling user requests and tool selection.

## Tech Stack
- **Frontend**: React, Redux Toolkit, Tailwind CSS, Lucide Icons.
- **Backend**: FastAPI, MongoDB (Motor), LangGraph, Groq LLM.
- **Database**: MongoDB Atlas.

## Setup Instructions

### Backend
1. Navigate to `backend/`
2. Create a virtual environment: `python -m venv venv`
3. Activate it: `source venv/bin/activate` (Mac/Linux) or `venv\Scripts\activate` (Windows)
4. Install dependencies: `pip install -r requirements.txt`
5. Configure `.env`:
   - `MONGO_URI`: Your MongoDB Atlas connection string.
   - `GROQ_API_KEY`: Your Groq API key.
6. Run the server: `python app/main.py`

### Frontend
1. Navigate to `frontend/`
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Access at `http://localhost:3000`

## LangGraph Tools
1. **log_interaction**: Extracts data and saves to MongoDB.
2. **edit_interaction**: Updates specific fields in existing interactions.
3. **summarize_interaction**: Provides a concise summary of discussion notes.
4. **suggest_followup**: Recommends next steps based on interaction outcome.
5. **hcp_history_lookup**: Retrieves recent interaction history for a specific HCP.
