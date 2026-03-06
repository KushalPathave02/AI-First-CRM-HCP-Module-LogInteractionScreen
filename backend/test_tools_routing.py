import os
import json
import asyncio
from app.agents.langgraph_agent import agent
from langchain_core.messages import HumanMessage
from dotenv import load_dotenv

load_dotenv()

async def test_routing():
    test_cases = [
        {"input": "Search for Dr. Smith", "expected_tool": "SearchHCP"},
        {"input": "Summarize our conversation", "expected_tool": "Summarize"},
        {"input": "Save this interaction", "expected_tool": "LogInteraction"},
        {"input": "What should I do next?", "expected_tool": "SuggestFollowUp"},
        {"input": "Edit the last record", "expected_tool": "EditInteraction"},
        {"input": "I met Dr. John Doe today", "expected_tool": "ExtractFields"}
    ]
    
    print("--- Testing Tool Routing ---")
    for case in test_cases:
        inputs = {
            "messages": [HumanMessage(content=case['input'])],
            "form_data": {}
        }
        result = await agent.ainvoke(inputs)
        # Assuming the LLM returns the tool_used in the message or state
        # Our current implementation doesn't store tool_used in state but returns it in the message content
        # based on the prompt instructions.
        print(f"Input: {case['input']}")
        print(f"Reply: {result['messages'][-1].content}")
        print("-" * 30)

if __name__ == "__main__":
    asyncio.run(test_routing())
