import google.generativeai as genai
import json
from dotenv import load_dotenv
import os
load_dotenv()


api_key = os.getenv("GEMINI_API_KEY")

genai.configure(api_key=api_key)

model = genai.GenerativeModel("gemini-2.5-flash")

def clean_json(text):

    text = text.replace("```json", "")
    text = text.replace("```", "")

    return json.loads(text)


def ask_ai(prompt):

    response = model.generate_content(prompt)
    data = clean_json(response.text)
    return data