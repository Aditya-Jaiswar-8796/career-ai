import shutil
import tempfile
from fastapi import APIRouter, BackgroundTasks, HTTPException
from fastapi.responses import FileResponse

from ..services.latex_generator import generate_pdf

router = APIRouter()


@router.post("/generate-resume-pdf")
async def generate_resume_pdf(payload: dict, background_tasks: BackgroundTasks):
    form_data = payload.get("formData")
    template_name = payload.get("template", "modern")

    if not form_data or not isinstance(form_data, dict):
        raise HTTPException(status_code=400, detail="formData is required")

    if template_name not in [
        "modern",
        "clean",
        "minimal",
        "professional",
        "portfolio",
        "onepage",
        "creative",
    ]:
        raise HTTPException(status_code=400, detail="Invalid template")

    temp_dir = tempfile.mkdtemp()
    try:
        pdf_path = generate_pdf(form_data, template_name, output_dir=temp_dir)
    except Exception as exc:
        shutil.rmtree(temp_dir, ignore_errors=True)
        raise HTTPException(status_code=500, detail=f"Failed to generate PDF: {exc}")

    background_tasks.add_task(shutil.rmtree, temp_dir, True)
    return FileResponse(pdf_path, media_type="application/pdf", filename="resume.pdf")
