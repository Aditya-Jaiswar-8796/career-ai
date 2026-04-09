import zipfile
import os
from services.parser import parse_resume
from services.semantic_matcher import semantic_match
from services.bulk_details import bulk_analyze

def analyze_bulk_resumes(name,file_bytes, job_description):


    resume_text = parse_resume(file_bytes, False)
    match = semantic_match(resume_text, job_description)
    details = bulk_analyze(resume_text, job_description, match["match_score"])   
    return [{
        "file_name": name,
        "name": details["candidateName"],
        "match": match["match_score"],
        "status": details["status"],
        "role": details["role"],
        "summary": details["candidateSummary"]
    }]
                