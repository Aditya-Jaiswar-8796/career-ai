from fastapi import APIRouter
from services.matcher import match_resume_job

router = APIRouter()

@router.post("/match-job")

def match_job(data: dict):

    resume = data["resume"]
    job_description = data["job_description"]

    result = match_resume_job(resume, job_description)

    return result