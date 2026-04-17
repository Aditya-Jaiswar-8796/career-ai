from google import genai
import json
from dotenv import load_dotenv
import os
load_dotenv()

api_key = os.getenv("GOOGLE_GENERATIVE_AI_API_KEY")
if not api_key:
    raise RuntimeError("GOOGLE_GENERATIVE_AI_API_KEY is not set")

genai.configure(api_key=api_key)
client = genai.ReplyClient()


def clean_json(text):
    text = text.replace("```json", "")
    text = text.replace("```", "")
    return json.loads(text)


def ask_ai(prompt):
    response = client.generate(model="gemini-2.5-flash", input=prompt)
    output_text = ""
    if getattr(response, "output", None) and response.output[0].content:
        output_text = response.output[0].content[0].text
    elif hasattr(response, "output_text"):
        output_text = response.output_text
    else:
        output_text = str(response)

    data = clean_json(output_text)
    return data