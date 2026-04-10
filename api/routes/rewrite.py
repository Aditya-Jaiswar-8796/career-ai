from fastapi import APIRouter
from ..services.rewrite import rewrite_resume

router = APIRouter()

@router.post("/rewrite-resume")

def rewrite(data: dict):

    resume = data["resume"]
    job = data["job_description"]
    style = data["style"]

    result = rewrite_resume(resume, job, style)

    return result