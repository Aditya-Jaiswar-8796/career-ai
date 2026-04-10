from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from mangum import Mangum

from .routes import resume, job, skill_gap, rewrite, bulk_resume
import os
print("FILES:", os.listdir())

app = FastAPI()

origins = [
    "http://localhost:3000",
    "https://career-ai-self-nine.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(bulk_resume.router)
app.include_router(rewrite.router)
app.include_router(skill_gap.router)
app.include_router(job.router)
app.include_router(resume.router)

@app.get("/")
def home():
    return {"message": "AI Resume Backend Running"}

# ✅ THIS IS THE FIX
handler = Mangum(app)