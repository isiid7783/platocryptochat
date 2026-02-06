# ai-node/core/decisionEngine.py
def evaluate_risk(text: str):
    score = 0

    if "private key" in text.lower():
        score += 5

    if "send money" in text.lower():
        score += 3

    if len(text) > 500:
        score += 1

    return min(score, 10)
