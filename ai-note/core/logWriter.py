# ai-node/core/logWriter.py
import json
import os
from datetime import datetime

LOG_FILE = "data/decision_logs.json"

os.makedirs("data", exist_ok=True)


def write_log(entry):
    if not os.path.exists(LOG_FILE):
        with open(LOG_FILE, "w") as f:
            json.dump([], f)

    with open(LOG_FILE, "r") as f:
        logs = json.load(f)

    logs.append({
        "timestamp": datetime.utcnow().isoformat(),
        **entry
    })

    with open(LOG_FILE, "w") as f:
        json.dump(logs, f, indent=2)
