from fastapi import (APIRouter, Depends)
import openai
import os
import json
from queries.ai import AiQueries, Message



OPENAI_API_KEY = os.environ["OPENAI_API_KEY"]

router = APIRouter()

openai.api_key = OPENAI_API_KEY
start_sequence = "\nA:"
restart_sequence = "\n\nQ: "


@router.post("/chat")
def chatbot(message: Message):
    prompt = f"{restart_sequence}{message.message}{start_sequence}"
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=prompt,
        temperature=0.9,
        max_tokens=3000,
        top_p=1,
        frequency_penalty=0.5,
        presence_penalty=0.1,
    )
    answer = response.choices[0].text.strip()
    response_data = {"type": "ai", "answer": answer, "response": response}
    print("AI-generated response JSON:", json.dumps(response_data, indent=2, default=str))

    return {"answer": answer}


@router.post("/chat/submit")
def chatbot_submit(message: Message, repo: AiQueries = Depends()):
    prompt = f"{restart_sequence}{message.message}{start_sequence}"
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=prompt,
        temperature=0.9,
        max_tokens=3000,
        top_p=1,
        frequency_penalty=0.5,
        presence_penalty=0.1,
    )
    answer = response.choices[0].text.strip()
    response_data = {"type": "ai", "answer": answer, "response": response}
    idea = repo.add_idea(Message(message=answer))
    print("AI-generated response JSON:", json.dumps(response_data, indent=2, default=str))

    return {"answer": idea}
