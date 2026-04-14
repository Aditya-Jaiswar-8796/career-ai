from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from mangum import Mangum

from .routes import resume, job, skill_gap, rewrite, bulk_resume, cover_letter, resume_builder

app = FastAPI(root_path="/python")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://career-ai-self-nine.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(bulk_resume.router)
app.include_router(rewrite.router)
app.include_router(cover_letter.router)
app.include_router(resume_builder.router)
app.include_router(skill_gap.router)
app.include_router(job.router)
app.include_router(resume.router)

@app.get("/py")
def home():
    return {"message": "AI Resume Backend Running"}

handler = Mangum(app)