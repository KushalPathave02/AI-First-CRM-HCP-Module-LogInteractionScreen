from typing import TypedDict, Annotated, List, Union
from langgraph.graph import StateGraph, END
from langchain_core.messages import BaseMessage, HumanMessage, AIMessage
from app.llm.groq_client import get_groq_response
import json

class AgentState(TypedDict):
    messages: Annotated[List[BaseMessage], lambda x, y: x + y]
    form_data: dict

import datetime

def call_model(state: AgentState):
    last_message = state['messages'][-1].content
    current_form = state.get('form_data', {})
    today = datetime.date.today().strftime("%Y-%m-%d")
    yesterday = (datetime.date.today() - datetime.timedelta(days=1)).strftime("%Y-%m-%d")
    
    prompt = f"""
    You are an AI assistant for a CRM. Your task is to extract interaction details from the user's message.
    
    CURRENT DATE: {today}
    YESTERDAY: {yesterday}
    
    CURRENT FORM STATE:
    {json.dumps(current_form, indent=2)}
    
    USER MESSAGE: "{last_message}"
    
    INSTRUCTIONS:
    1. EXTRACT and structure the following fields:
       - hcp_name: Full name of the HCP.
       - interaction_type: Strictly 'Meeting', 'Call', or 'Email'.
       - date: YYYY-MM-DD format. Handle relative dates: 'today'={today}, 'yesterday'={yesterday}.
       - time: HH:MM format.
       - attendees: List of names mentioned.
       - topics_discussed: Key points of conversation.
       - materials_shared: List of documents or materials shared.
       - samples_distributed: List of product samples given.
       - sentiment: Strictly 'Positive', 'Neutral', or 'Negative'.
       - outcome: Result or agreement reached.
       - follow_up: Specific next steps.
    
    2. CONVERSATIONAL RESPONSE:
       Confirm exactly what was updated. If multiple fields were filled, list them professionally.
       Example: "I've recorded the meeting with Dr. Smith for today, including the positive sentiment and the follow-up to send the brochure."

    3. OUTPUT FORMAT:
       Respond ONLY with a JSON object:
       {{
         "extracted_fields": {{ 
           "hcp_name": "...",
           "interaction_type": "...",
           "date": "...",
           "time": "...",
           "attendees": [...],
           "topics_discussed": "...",
           "materials_shared": [...],
           "samples_distributed": [...],
           "sentiment": "...",
           "outcome": "...",
           "follow_up": "..."
         }},
         "reply": "Your conversational message here"
       }}
    """
    
    response_text = get_groq_response(prompt)
    try:
        response_json = json.loads(response_text)
        extracted_updates = response_json.get("extracted_fields", {})
        reply_message = response_json.get("reply", "I've updated the interaction details.")
        new_form_data = {**current_form, **extracted_updates}
    except Exception as e:
        print(f"Error parsing LLM response: {e}")
        new_form_data = current_form
        reply_message = "I've processed your message, but couldn't extract specific form details. Could you provide more information?"
        
    return {
        "form_data": new_form_data, 
        "messages": [AIMessage(content=reply_message)]
    }

def create_agent():
    workflow = StateGraph(AgentState)
    workflow.add_node("agent", call_model)
    workflow.set_entry_point("agent")
    workflow.add_edge("agent", END)
    return workflow.compile()

agent = create_agent()
