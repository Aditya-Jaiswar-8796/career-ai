from utils.prompts import skill_gap_prompt
from services.ai_engine import ask_ai


def analyze_skill_gap(resume, job):

    prompt = skill_gap_prompt(resume, job)

    result = ask_ai(prompt)

    return result