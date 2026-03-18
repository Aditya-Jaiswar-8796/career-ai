from fastapi import APIRouter, UploadFile
import zipfile
import io
from services.bulk_analyzer import analyze_bulk_resumes

router = APIRouter()

@router.post("/bulk-analyze")
async def bulk_analyze(file: UploadFile, job_description: str):

    zip_bytes = await file.read()

    zip_file = zipfile.ZipFile(io.BytesIO(zip_bytes))

    results = analyze_bulk_resumes(zip_file, job_description)

    return results[:10]