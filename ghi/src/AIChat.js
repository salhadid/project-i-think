import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const AIChat = () => {
    const [messages, setMessages] = useState([
        {
            message: "Hiya! Let's come up with some ideas together!",
            type: "thinkbot",
        },
    ]);
    const [input, setInput] = useState("");
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = (event) => {
        event.preventDefault();

        axios
            .post(`${process.env.REACT_APP_iThink}/chat`, { message: input })
            .then((res) => {
                setMessages([
                    ...messages,
                    { message: input, type: "guest" },
                    { message: res.data.answer, type: "thinkbot" },
                ]);
                setInput("");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="flex flex-col h-full bg-gray-100">
            <div className="h-80 p-4 overflow-y-auto hide-scrollbar">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`flex flex-col ${
                            message.type === "thinkbot"
                                ? "items-start"
                                : "items-end"
                        } mb-2`}
                    >
                        <p className="text-sm font-medium mb-1">
                            {message.type === "thinkbot" ? "ThinkBot" : "Guest"}
                        </p>
                        <div
                            className={`${
                                message.type === "thinkbot"
                                    ? "bg-white text-gray-800 rounded-tl-none"
                                    : "bg-purple-500 text-white rounded-tr-none"
                            } rounded-md px-4 py-2 max-w-xs`}
                        >
                            <p>{message.message}</p>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <form onSubmit={sendMessage} className="p-4">
                <div className="flex items-center">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your message here"
                        className="flex-1 border rounded-md px-2 py-1 mr-2"
                    />
                    <button
                        type="submit"
                        className="bg-purple-500 text-white rounded-md px-4 py-2"
                    >
                        Send
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AIChat;
