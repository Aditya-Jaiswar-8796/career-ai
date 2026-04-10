from .ai_engine import ask_ai
from ..utils.prompts import bulk_analyze_prompt

def bulk_analyze(resume, job, match_score):

    prompt = bulk_analyze_prompt(resume, job, match_score)

    result = ask_ai(prompt)

    return result