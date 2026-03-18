def resume_parse_prompt(text):
    return f"""
        You are an expert resume parser.

        Convert the following resume text into structured JSON.

        Return JSON only.

        Fields required:

        name
        email
        phone
        skills
        education
        experience
        projects

        Resume Text:
        {text}
        """

def skill_gap_prompt(resume, job):

    return f"""
    You are an expert career coach.

    Compare the resume with the job description.

    Return JSON with:

    match_score
    missing_skills
    strengths
    learning_plan

    Resume:
    {resume}

    Job Description:
    {job}

    learning_plan should be a 4 week roadmap if possible.
    Return JSON only.
    """


def match_resume_prompt(resume, job_description):

    return f"""
    You are an expert recruiter.

    Compare the following resume with the job description.

    Return JSON with:

    match_score (5-98)
    score_breakdown:
    - skills_match
    - experience_match
    - education_match
    - tools_match
    - soft_skills_match
    
    missing_skills
    strengths
    suggestions

    Do not return 0 unless absolutely no relation exists.

    Resume:
    {resume}

    Job Description:
    {job_description}
    """

def rewrite_resume_prompt(resume, job):

    return f"""
You are a professional resume writer.

Rewrite the resume so it matches the job description.

Rules:
- Optimize for ATS
- Highlight relevant skills
- Use strong action verbs
- Keep achievements measurable

Return JSON format:

{{
"name": "",
"summary": "",
"skills": [],
"experience": [],
"projects": [],
"education": []
}}

Resume:
{resume}

Job Description:
{job}

Return ONLY JSON.
"""