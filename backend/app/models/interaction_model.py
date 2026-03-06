from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class InteractionModel(BaseModel):
    id: Optional[str] = Field(None, alias="_id")
    hcp_name: str
    interaction_type: str
    date: str
    time: str
    topics_discussed: str
    materials_shared: List[str] = []
    samples_distributed: List[str] = []
    sentiment: str
    outcome: str
    follow_up: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        json_schema_extra = {
            "example": {
                "hcp_name": "Dr. Smith",
                "interaction_type": "Meeting",
                "date": "2025-04-19",
                "time": "19:36",
                "topics_discussed": "Discussed Product X",
                "materials_shared": ["Brochure"],
                "samples_distributed": ["Product X Sample"],
                "sentiment": "Positive",
                "outcome": "Interested",
                "follow_up": "Send research paper"
            }
        }
