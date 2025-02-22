import subprocess
from config import MODEL_PATH

def run_llama(prompt):
    result = subprocess.run(
        ["./main", "-m", MODEL_PATH, "-p", prompt],
        capture_output=True,
        text=True
    )
    return result.stdout.strip()
