import google.generativeai as genai
from dotenv import load_dotenv
import os
load_dotenv()


api_key = os.getenv("GOOGLE_GENERATIVE_AI_API_KEY")

genai.configure(api_key=api_key)

def get_embedding(text):

    result = genai.embed_content(
        model="models/gemini-embedding-001",
        content=text
    )

    return result["embedding"]