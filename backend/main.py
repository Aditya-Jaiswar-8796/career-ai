from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import resume
from routes import job
from routes import skill_gap
from routes import rewrite
from routes import bulk_resume
app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
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