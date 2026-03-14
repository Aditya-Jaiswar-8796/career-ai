from fastapi import FastAPI
from routes import resume
from routes import job
from routes import skill_gap
from routes import rewrite
app = FastAPI()

app.include_router(rewrite.router)

app.include_router(skill_gap.router)
app.include_router(job.router)
app.include_router(resume.router)

@app.get("/")
def home():
    return {"message": "AI Resume Backend Running"}