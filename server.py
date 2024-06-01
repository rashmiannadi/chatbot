from flask import Flask, request, jsonify
import openai
from flask_cors import CORS
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json.get('message')

    try:
        openai.api_key = "sk-proj-ZFishUGKYz9wsAEYMewjT3BlbkFJpRaqtoDCNsDYAwZil0Ct"
        response = openai.Completion.create(
            model="gpt-3.5-turbo-instruct",
            prompt=f"User: {user_message}\nBot:",
            max_tokens=50
        )
        # response = openai.Completion.create(
        #     engine="davinci-002",
        #     prompt=f"User: {user_message}\nBot:",
        #     max_tokens=150,
        #     n=1,
        #     stop=["\nUser:"],
        #     temperature=0.9,
        # )

        bot_message = response.choices[0].text.strip()
        return jsonify({"message": bot_message})
    except Exception as e:
        print(f"Error communicating with OpenAI API: {e}")
        return jsonify({"message": "I'm sorry, but I couldn't process your request at the moment."}), 500

if __name__ == '__main__':
    app.run(debug=True)
