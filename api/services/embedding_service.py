from google import genai
from dotenv import load_dotenv
import os
load_dotenv()

api_key = os.getenv("GOOGLE_GENERATIVE_AI_API_KEY")
if not api_key:
    raise RuntimeError("GOOGLE_GENERATIVE_AI_API_KEY is not set")

genai.configure(api_key=api_key)
client = genai.EmbeddingClient()


def get_embedding(text):
    response = client.embed(
        model="textembedding-gecko-001",
        input=text
    )
    return response.data[0].embedding