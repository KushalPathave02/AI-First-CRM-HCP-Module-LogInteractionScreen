from fastapi import APIRouter, HTTPException
from app.agents.langgraph_agent import agent
from langchain_core.messages import HumanMessage

router = APIRouter()

@router.post("/chat")
async def chat_endpoint(payload: dict):
    message = payload.get("message")
    current_form = payload.get("form_data", {})
    
    if not message:
        raise HTTPException(status_code=400, detail="Message is required")
    
    # Invoke LangGraph agent
    inputs = {
        "messages": [HumanMessage(content=message)],
        "form_data": current_form
    }
    
    result = await agent.ainvoke(inputs)
    
    return {
        "reply": result["messages"][-1].content,
        "updated_form": result["form_data"]
    }

@router.post("/save")
async def save_interaction(data: dict):
    from app.tools.log_interaction import log_interaction
    return await log_interaction(data)
