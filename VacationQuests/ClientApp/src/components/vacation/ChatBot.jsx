import React, { useState } from 'react';

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const OPEN_AI_KEY = process.env.REACT_APP_OPEN_AI_KEY;

    //console.log("Process.env :", process.env);

    //List me the top 10 locations to visit in Japan
    const sendMessage = async () => {
        if (input.trim() === '') return;
        console.log("OPEN_AI_KEY:", process.env.REACT_APP_OPEN_AI_KEY);

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + OPEN_AI_KEY,
            },
            body: JSON.stringify({
                messages: [
                    { role: 'system', content: 'You are a helpful assistant.' },
                    { role: 'user', content: input },
                ],
            }),
        });

        const responseData = await response.json();
        setMessages([...messages, { role: 'user', content: input }, { role: 'assistant', content: responseData.choices[0].message.content }]);
        setInput('');
    };

    return (
        <div>
            <div className="chat-window">
                {messages.map((message, index) => (
                    <div key={index} className={`message ${message.role}`}>
                        {message.content}
                    </div>
                ))}
            </div>
            <div className="input-container">
                <input
                    type="text"
                    placeholder="Type your message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default Chatbot;
