from services.ai_engine import ask_ai
from utils.prompts import match_resume_prompt


def match_resume_job(resume, job_description):

    prompt = match_resume_prompt(resume, job_description)

    result = ask_ai(prompt)

    return result