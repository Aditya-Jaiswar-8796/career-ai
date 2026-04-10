
from .ai_engine import ask_ai
from ..utils.prompts import resume_parse_prompt
import fitz

def parse_resume(file_bytes,ifjson: bool):

    text = ""

    with fitz.open(stream=file_bytes, filetype="pdf") as doc:
        for page in doc:
            blocks = page.get_text("blocks")

            for block in blocks:
                text += block[4]   


    prompt = resume_parse_prompt(text)
    if ifjson :
        result = ask_ai(prompt)
    else :
        result = text


    return result