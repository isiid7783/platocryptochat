# ai-node/core/analyzer.py
import re


def analyze_message(text: str):
    keywords = {
        "financial": ["invest", "money", "crypto", "loan"],
        "conflict": ["angry", "hate", "fight"],
        "sensitive": ["password", "secret", "private key"]
    }

    detected = []

    for category, words in keywords.items():
        for w in words:
            if re.search(rf"\b{w}\b", text.lower()):
                detected.append(category)
                break

    sentiment = "neutral"
    if any(word in text.lower() for word in ["good", "great", "happy"]):
        sentiment = "positive"
    if any(word in text.lower() for word in ["bad", "terrible", "sad"]):
        sentiment = "negative"

    return {
        "categories": detected,
        "sentiment": sentiment,
        "length": len(text)
    }
