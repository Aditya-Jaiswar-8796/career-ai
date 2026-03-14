from fastapi import APIRouter
from services.semantic_matcher import semantic_match

router = APIRouter()

@router.post("/semantic-match")

def match(data: dict):

    resume = data["resume"]
    job = data["job_description"]

    return semantic_match(resume, job)