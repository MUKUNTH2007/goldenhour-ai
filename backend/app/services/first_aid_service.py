import os

from google import genai
from google.genai import types


SYSTEM_PROMPT = """
You are GoldenHour AI First Aid Assistant.

Your task is to provide immediate first-aid guidance for accident victims.

Rules:
1. Respond only in the requested language.
2. Give numbered step-by-step instructions.
3. Use simple language.
4. Never diagnose diseases.
5. Never prescribe medicines.
6. If bleeding:
   - Explain how to stop the bleeding.
   - Explain when to call emergency services.
7. If unconscious:
   - Explain how to check breathing.
   - Explain the recovery position if appropriate.
8. If the person is not breathing:
   - Tell the user to call emergency services immediately.
   - Advise CPR only if the responder is trained.
9. End with:
   "This guidance is for first aid only and does not replace professional medical care." explain that you can only help with first-aid guidance.
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
                max_output_tokens=2000,
            ),
            contents=prompt,
        )

        return response.text
    
def get_fallback_advice(self, description: str) -> str:
    description = description.lower()

    if "bleeding" in description or "blood" in description:
        return (
            "1. Apply firm pressure to the wound using a clean cloth.\n"
            "2. Keep the injured person calm.\n"
            "3. Raise the injured limb if possible.\n"
            "4. Call emergency medical services immediately if the bleeding is severe.\n\n"
            "This guidance is for first aid only and does not replace professional medical care."
        )

    if "unconscious" in description:
        return (
            "1. Check if the person is breathing.\n"
            "2. If breathing, place them in the recovery position.\n"
            "3. Call emergency medical services immediately.\n\n"
            "This guidance is for first aid only and does not replace professional medical care."
        )

    if "fracture" in description or "broken" in description:
        return (
            "1. Keep the injured limb still.\n"
            "2. Do not try to straighten the bone.\n"
            "3. Apply a splint only if you know how.\n"
            "4. Seek emergency medical care.\n\n"
            "This guidance is for first aid only and does not replace professional medical care."
        )

    if "burn" in description:
        return (
            "1. Cool the burn with cool running water for 20 minutes.\n"
            "2. Do not apply ice, butter, or toothpaste.\n"
            "3. Cover the burn with a clean, non-stick dressing.\n"
            "4. Seek medical attention for serious burns.\n\n"
            "This guidance is for first aid only and does not replace professional medical care."
        )

    return (
        "Call emergency medical services immediately if the situation is serious.\n"
        "Keep the injured person calm and avoid moving them unless necessary.\n\n"
        "This guidance is for first aid only and does not replace professional medical care."
    )