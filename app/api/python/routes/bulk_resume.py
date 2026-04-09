from typing import List
from fastapi import APIRouter, File, UploadFile, Form
from ..services.bulk_analyzer import analyze_bulk_resumes

router = APIRouter()

@router.post("/bulk-analyze")
async def bulk_analyze(files:  List[UploadFile] = File(...), job_description: str = Form(...)):

    all_results = []
    print(files,job_description)
    for file in files:
        name= file.filename
        content = await file.read()
        results = analyze_bulk_resumes(name,content, job_description)
        all_results.extend(results)

    ranked = sorted(all_results, key=lambda x: x["match"], reverse=True)

    return ranked[:10]