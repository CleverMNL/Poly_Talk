from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess

app = Flask(__name__)
CORS(app)

@app.route("/translate", methods=["POST"])
def translate():
    data = request.json
    user_message = data.get("userMessage")
    target_language = data.get("targetLanguage")

    # Call LLaMA locally (using llama.cpp)
    result = subprocess.run(
        ["./main", "-m", "model/llama3.2.gguf", "-p", f"Translate '{user_message}' to {target_language}"],
        capture_output=True,
        text=True
    )

    response = result.stdout.strip()
    return jsonify({"translatedText": response})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
