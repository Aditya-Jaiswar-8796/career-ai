import json
import os
from bson import ObjectId
from dotenv import load_dotenv
from fastapi import APIRouter, HTTPException
from pymongo import MongoClient

from ..services.ai_engine import model

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
if not MONGO_URI:
    raise RuntimeError("MONGO_URI is not configured")

client = MongoClient(MONGO_URI)
db = client.get_default_database()
profiles_collection = db["profiles"]

router = APIRouter()


def get_resume_json_for_user(user_id: str):
    query = None
    if ObjectId.is_valid(user_id):
        query = {"user": ObjectId(user_id)}
        profile = profiles_collection.find_one(query)
        if not profile:
            profile = profiles_collection.find_one({"_id": ObjectId(user_id)})
    else:
        profile = profiles_collection.find_one({"user": user_id})

    if not profile:
        return None

    resume_results = profile.get("resumeJsonResults") or []
    if isinstance(resume_results, list) and resume_results:
        return resume_results[-1]
    return None


@router.post("/generate-cover-letter")
async def generate_cover_letter(payload: dict):
    job_description = payload.get("job_description")
    user_id = payload.get("user_id")

    if not job_description or not user_id:
        raise HTTPException(status_code=400, detail="job_description and user_id are required")

    resume_json = get_resume_json_for_user(user_id)
    if not resume_json:
        raise HTTPException(status_code=404, detail="Resume JSON not found for user")

    system_prompt = """
You are an expert career coach. Write a cover letter that:
- Matches specific achievements from the Resume to the Job Description.
- Uses a professional yet modern tone.
- Is under 300 words.
- Format: Return ONLY the text of the letter.
"""

    prompt = f"{system_prompt}\n\nResume JSON:\n{json.dumps(resume_json, default=str, indent=2)}\n\nJob Description:\n{job_description}\n\nWrite a professional cover letter in 3 paragraphs highlighting matching skills and achievements from the Resume to the Job Description. Return only the text of the letter."

    response = model.generate_content(prompt)
    letter_text = response.text.strip()

    return {"cover_letter": letter_text}
