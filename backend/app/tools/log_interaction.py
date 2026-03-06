from app.database.mongodb import interaction_collection
from datetime import datetime

async def log_interaction(data: dict):
    data["created_at"] = datetime.utcnow()
    result = await interaction_collection.insert_one(data)
    return {"status": "success", "id": str(result.inserted_id), "data": data}

async def edit_interaction(interaction_id: str, updates: dict):
    from bson import ObjectId
    result = await interaction_collection.update_one(
        {"_id": ObjectId(interaction_id)},
        {"$set": updates}
    )
    return {"status": "success", "modified_count": result.modified_count}

async def summarize_interaction(text: str):
    # This would typically call the LLM to summarize
    return {"summary": text[:100] + "..." if len(text) > 100 else text}

async def suggest_followup(interaction_data: dict):
    # Logic to suggest follow-up based on interaction
    return {"suggestion": "Schedule a follow-up meeting in 2 weeks to discuss clinical trial results."}

async def hcp_history_lookup(hcp_name: str):
    cursor = interaction_collection.find({"hcp_name": hcp_name}).sort("created_at", -1).limit(5)
    history = await cursor.to_list(length=5)
    for doc in history:
        doc["_id"] = str(doc["_id"])
    return {"hcp_name": hcp_name, "history": history}
