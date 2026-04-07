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
        score:
            comment:
            experienceScore:
            formattingScore:
            keywordScore:
            overallScore:
            structureScore:
            recommendations:

        in score we have overall score , comment: only a small statement, scores for structure, keyword, experience, formatting, top 3 recomandation all the score data must range between 0 to 100
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
    jobTitle
    matchScore (5-98)
    scoreBreakdown:
    - skillsMatch
    - experienceMatch
    - educationMatch
    - softSkillsMatch
    
    missingSkills
    matchSkills
    strengths: 3
    suggestions: 3

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


def bulk_analyze_prompt(resume, job_description, match_score):

    return f"""
    You are an expert recruiter.

    Comparing the following resume with the job description we get sementic match score of {match_score} out of 100.


    Return JSON with:
    
    candidateSummary: A brief summary of the candidate's profile.
    status: "Strong Match", "Good Match", "Weak Match", or "No Match" based on the match score.
    role: The most suitable role for the candidate based on their resume and the job description. 
    candidateName: Extract the candidate's name from the resume.

    Resume:
    {resume}

    Job Description:
    {job_description}
    """
