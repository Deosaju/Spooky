"use client";

import { useEffect, useRef, useState } from "react";
import Loader from "../../components/Loader";
import openai from "../../services/openai/openai";
import generateStoryPrompt from "./_components/GenerateStoryPrompt";
import type { NextPage } from "next";
import { APIConnectionError } from "openai";

interface Message {
  text: string;
  sender: string;
}

const Story: NextPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Welcome to the story generator! To begin, please provide a brief prompt or idea for your story.",
      sender: "Bot",
    },
  ]);

  const [messagesStore, setMessagesStore] = useState("");
  const [fullStory, setFullStory] = useState("");
  const [inputMessage, setInputMessage] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputMessage.trim() !== "") {
      const userMessage = { text: inputMessage, sender: "User" };
      setMessages([...messages, userMessage]);
      const promt = generateStoryPrompt(messagesStore + inputMessage);
      setMessagesStore(messagesStore + inputMessage);
      setInputMessage("");
      setIsBotTyping(true);

      try {
        const response = await openai.chat.completions.create({
          messages: [{ role: "system", content: promt }],
          model: "gpt-3.5-turbo",
        });

        if (APIConnectionError) {
          let generatedStory = response.choices[0].message.content;
          if (generatedStory == null) {
            generatedStory = "";
          } else {
            setMessages([...messages, userMessage, { text: generatedStory, sender: "Bot" }]);
            setFullStory(fullStory + generatedStory);
            setMessagesStore(messagesStore + generatedStory);
          }
        } else {
          console.error("Error generating story:", APIConnectionError);
          setMessages([
            ...messages,
            userMessage,
            {
              text: "Oops! Something went wrong. Please try again.",
              sender: "Bot",
            },
          ]);
        }
      } catch (error) {
        console.error("Error generating story:", error);
        setMessages([
          ...messages,
          userMessage,
          {
            text: "Oops! Something went wrong. Please try again.",
            sender: "Bot",
          },
        ]);
      }

      setIsBotTyping(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="container mx-auto my-10">
          <h1 className="text-4xl text-center font-bold mb-10">Story Generator</h1>
          <div className="border border-gray-300 bg-slate-700 rounded-lg p-4">
            <div ref={chatContainerRef} className="h-96 overflow-y-auto hide-scrollbar p-10">
              {messages.map((message, index) => (
                <div key={index} className={`mb-2 ${message.sender === "User" ? "text-right" : "text-left"}`}>
                  <span
                    className={`inline-block px-2 py-1 rounded ${
                      message.sender === "User" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {message.text}
                  </span>
                </div>
              ))}
              {isBotTyping && (
                <div className="text-left mt-2">
                  <span className="inline-block bg-gray-200 text-gray-800 px-5 py-2 rounded">
                    <div className="dot-typing">...</div>
                  </span>
                </div>
              )}
            </div>
            <div className="mt-4 flex">
              <input
                type="text"
                className="flex-grow border border-gray-300 rounded px-2 py-1 mr-2"
                value={inputMessage}
                onChange={e => setInputMessage(e.target.value)}
                onKeyPress={e => {
                  if (e.key === "Enter") {
                    handleSendMessage();
                  }
                }}
              />
              <button
                className="bg-blue-500 text-white px-4 py-1 rounded"
                onClick={handleSendMessage}
                disabled={isBotTyping}
              >
                Send
              </button>
            </div>
          </div>
          <div>
            <button className="btn btn-outline rounded-md mt-5 btn-success">Post Story</button>
          </div>
        </div>
      )}
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
};

export default Story;
