import zipfile
import os
from services.parser import parse_resume
from services.semantic_matcher import semantic_match


def analyze_bulk_resumes(zip_file, job_description):

    results = []

    for name in zip_file.namelist():

        with zip_file.open(name) as f:
            file_bytes = f.read()

            resume_text = parse_resume(file_bytes, False)

            match = semantic_match(resume_text, job_description)

            results.append({
                "name": name,
                "score": match["match_score"]
            })
            
    ranked = sorted(results, key=lambda x: x["score"], reverse=True)

    return ranked