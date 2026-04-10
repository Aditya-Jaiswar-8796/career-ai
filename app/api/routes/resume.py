from fastapi import APIRouter, UploadFile, File
from ..services.parser import parse_resume


router = APIRouter()

@router.post("/upload-resume")
async def upload_resume(file: UploadFile = File(...)):

    contents = await file.read()

    
    structured_data = parse_resume(contents, True)

    return {
        "resume_json": structured_data
    }