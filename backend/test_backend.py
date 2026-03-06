import asyncio
import os
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient
from groq import Groq

load_dotenv()

async def test_connections():
    print("--- Testing Connections ---")
    
    # Test MongoDB
    mongo_uri = os.getenv("MONGO_URI")
    db_name = os.getenv("DATABASE_NAME", "crm_ai")
    try:
        client = AsyncIOMotorClient(mongo_uri)
        # The is_master command is cheap and does not require auth.
        await client.admin.command('ismaster')
        print("✅ MongoDB Atlas: Connected successfully")
    except Exception as e:
        print(f"❌ MongoDB Atlas: Connection failed - {e}")

    # Test Groq
    groq_api_key = os.getenv("GROQ_API_KEY")
    try:
        groq_client = Groq(api_key=groq_api_key)
        # Simple list models call to check API key
        groq_client.models.list()
        print("✅ Groq API: Key is valid")
    except Exception as e:
        print(f"❌ Groq API: Connection failed - {e}")

if __name__ == "__main__":
    asyncio.run(test_connections())
