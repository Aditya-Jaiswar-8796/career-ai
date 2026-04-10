import json
from .ai_engine import ask_ai
from .latex_generator import generate_pdf
from ..utils.prompts import rewrite_resume_prompt


def rewrite_resume(resume, job, style):

    prompt = rewrite_resume_prompt(resume, job)

    ai_result = ask_ai(prompt)

    data = json.loads(ai_result, style)

    pdf = generate_pdf(data)

    return pdf