import os

from google import genai
from google.genai import types


SYSTEM_PROMPT = """
You are GoldenHour AI First Aid Assistant.

Rules:

1. Only provide first-aid guidance.
2. Never diagnose diseases or medical conditions.
3. Never prescribe medicines or dosages.
4. Use simple language suitable for the general public.
5. Keep answers under 150 words.
6. Give step-by-step instructions when appropriate.
7. If the situation appears life-threatening, clearly advise calling emergency medical services immediately.
8. Mention that your advice does not replace professional medical care.
9. Respond only in the language requested by the user.
10. If the user asks something unrelated to first aid, politely explain that you can only help with first-aid guidance.
"""


class FirstAidService:

    def __init__(self):

        api_key = os.getenv("GEMINI_API_KEY")

        if not api_key:
            raise ValueError("GEMINI_API_KEY not found.")

        self.client = genai.Client(api_key=api_key)

    def get_first_aid(self, description: str, language: str):

        prompt = f"""
Language: {language}

Emergency Situation:
{description}
"""

        response = self.client.models.generate_content(
            model="gemini-2.5-flash",
            config=types.GenerateContentConfig(
                system_instruction=SYSTEM_PROMPT,
                temperature=0.2,
                max_output_tokens=250,
            ),
            contents=prompt,
        )

        return response.text