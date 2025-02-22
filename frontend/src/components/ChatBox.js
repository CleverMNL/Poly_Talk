import { useState } from "react";
import axios from "axios";

const ChatBox = () => {
    const [message, setMessage] = useState("");
    const [response, setResponse] = useState("");

    const sendMessage = async () => {
        try {
            const res = await axios.post("http://localhost:5000/translate", {
                userMessage: message,
                targetLanguage: "French", // Change dynamically
            });
            setResponse(res.data.translatedText);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} />
            <button onClick={sendMessage}>Translate</button>
            <p>AI Response: {response}</p>
        </div>
    );
};

export default ChatBox;
