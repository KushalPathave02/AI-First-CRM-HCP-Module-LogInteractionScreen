from typing import TypedDict, Annotated, List, Union
from langgraph.graph import StateGraph, END
from langchain_core.messages import BaseMessage, HumanMessage, AIMessage
from app.llm.groq_client import get_groq_response
import json

class AgentState(TypedDict):
    messages: Annotated[List[BaseMessage], lambda x, y: x + y]
    form_data: dict

import datetime

from app.tools.log_interaction import log_interaction
from app.tools.edit_interaction import edit_interaction
from app.tools.suggest_follow_up import suggest_follow_up
from app.tools.summarize_interaction import summarize_interaction
from app.tools.search_hcp import search_hcp

def call_model(state: AgentState):
    last_message = state['messages'][-1].content
    current_form = state.get('form_data', {})
    today = datetime.date.today().strftime("%Y-%m-%d")
    yesterday = (datetime.date.today() - datetime.timedelta(days=1)).strftime("%Y-%m-%d")
    
    prompt = f"""
    You are an AI assistant for a CRM. Your task is to extract interaction details and decide which tool to use.
    
    CURRENT DATE: {today}
    YESTERDAY: {yesterday}
    
    CURRENT FORM STATE:
    {json.dumps(current_form, indent=2)}
    
    USER MESSAGE: "{last_message}"
    
    AVAILABLE TOOLS:
    1. LogInteraction: Use when user wants to save/log the current form.
    2. EditInteraction: Use when user wants to update an existing record.
    3. SuggestFollowUp: Use when user asks for next steps or suggestions.
    4. Summarize: Use when user asks for a summary of the interaction.
    5. SearchHCP: Use when user wants to find an HCP.
    6. ExtractFields: Default action to update the current form fields.

    INSTRUCTIONS:
    - If the user is providing details for the form, use 'ExtractFields'.
    - If the user specifically asks to 'save', 'log', 'search', 'summarize', or 'suggest', mention the tool in your reply.
    
    EXTRACT and structure the following fields for 'ExtractFields':
    - hcp_name, interaction_type, date, time, attendees, topics_discussed, materials_shared, samples_distributed, sentiment, outcome, follow_up.
    
    OUTPUT FORMAT:
    Respond ONLY with a JSON object:
    {{
      "extracted_fields": {{ ... }},
      "tool_used": "ExtractFields | LogInteraction | EditInteraction | SuggestFollowUp | Summarize | SearchHCP",
      "reply": "Conversational confirmation of the action taken."
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
