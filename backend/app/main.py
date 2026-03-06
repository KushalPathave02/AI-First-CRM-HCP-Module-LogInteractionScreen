from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.interaction_routes import router as interaction_router

app = FastAPI(title="AI-First CRM HCP Module")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(interaction_router, prefix="/api")

@app.get("/")
async def root():
    return {"message": "HCP Interaction API is running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
