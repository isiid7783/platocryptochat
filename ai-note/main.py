# ai-node/main.py
from fastapi import FastAPI
from pydantic import BaseModel
from core.analyzer import analyze_message
from core.decisionEngine import evaluate_risk
from core.logWriter import write_log

app = FastAPI()


class MessageRequest(BaseModel):
    conversation_id: str
    sender: str
    message: str


@app.post("/analyze")
def analyze(req: MessageRequest):
    analysis = analyze_message(req.message)
    risk = evaluate_risk(req.message)

    result = {
        "conversation_id": req.conversation_id,
        "sender": req.sender,
        "analysis": analysis,
        "risk_score": risk
    }

    write_log(result)
    return result
