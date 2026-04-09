from fastapi import APIRouter
from services.skill_gap import analyze_skill_gap

router = APIRouter()


@router.post("/skill-gap")
def skill_gap(data: dict):

    resume = data["resume"]
    job = data["job_description"]

    result = analyze_skill_gap(resume, job)

    return result