import os
import json
import re
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=api_key)

model = genai.GenerativeModel("gemini-2.5-flash")

def get_recommendation(mode: str, preferences: str):
    prompt = f"""
    You are a smart recommendation engine.
    Mode: {mode}
    User Preferences: {preferences}

    Return ONLY valid JSON like:
    {{
        "best": "...",
        "alternatives": ["...", "...", "..."],
        "reason": "short explanation"
    }}
    """

    response = model.generate_content(prompt)
    text = response.text.strip()

    # Hack: extract JSON block from text using regex
    json_match = re.search(r"\{.*\}", text, re.DOTALL)
    if json_match:
        try:
            return json.loads(json_match.group())
        except json.JSONDecodeError:
            pass  # fallback below

    # fallback if parsing fails
    return {
        "best": "Could not parse response",
        "alternatives": [],
        "reason": text
    }