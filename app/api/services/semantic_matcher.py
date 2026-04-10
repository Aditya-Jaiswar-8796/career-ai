from .embedding_service import get_embedding
from ..utils.similarity import cosine_similarity

def semantic_match(resume, job):

    resume_vector = get_embedding(resume)
    job_vector = get_embedding(job)

    score = cosine_similarity(resume_vector, job_vector)

    return {
        "match_score": round(score * 100, 2)
    }