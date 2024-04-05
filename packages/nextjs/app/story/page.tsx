"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "../../components/Loader";
import openai from "../../services/openai/openai";
import generateStoryPrompt from "./_components/GenerateStoryPrompt";
import type { NextPage } from "next";
import { APIConnectionError } from "openai";
import { useAccount } from "wagmi";
import { StoryContract } from "~~/services/contract/StoryContract";
import { generateImagesFromPrompts } from "~~/utils/promts/imageGenerator";
import { generateImagePrompts } from "~~/utils/promts/promptGenerator";
import { TablelandUtils } from "~~/utils/tableland/tablelandutil";

const tablelandUtils = new TablelandUtils();
const storyContract = new StoryContract();
interface Message {
  text: string;
  sender: string;
  image?: string;
}

const Story: NextPage = () => {
  const router = useRouter();
  const { address: connectedAddress } = useAccount();
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
  const [isSaving, setIsSaving] = useState(false);
  const [title, setTitle] = useState("");
  const [imageMessage, setImageMessage] = useState<Message | null>(null);

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

  useEffect(() => {
    if (imageMessage) {
      setMessages(prevMessages => prevMessages.map(msg => (msg === imageMessage ? imageMessage : msg)));
    }
  }, [imageMessage]);

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
            const updatedMessage = await generateImageForMessage({ text: generatedStory, sender: "Bot" });
            if (updatedMessage) {
              setImageMessage(updatedMessage);
            }
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

  const generateImageForMessage = async (message: Message) => {
    try {
      const prompt = await generateImagePrompts(message.text);
      const image = await generateImagesFromPrompts(prompt);

      const updatedMessage: Message = {
        ...message,
        image: image,
      };

      return updatedMessage;
    } catch (error) {
      console.error("Error generating image:", error);
    }
  };

  const handleSaveStory = async () => {
    setIsSaving(true);
    try {
      if (title) {
        await storyContract.saveStory(title, fullStory);
        alert("Story saved successfully!");
        router.push(`/stories`);
      } else {
        alert("Title is required to save the story.");
      }
    } catch (error) {
      console.error("Error saving story:", error);
      alert("Error saving story. Please try again.");
    }
    setIsSaving(false);
  };

  const handleMintNFTs = async () => {
    try {
      if (title) {
        const prompt = await generateImagePrompts(fullStory);
        // const generatedImages = await generateImagesFromPrompts(prompt);
        const existingStory = await tablelandUtils.getStoryByTitle(title);
        const connectedAuthor = connectedAddress || "Unknown";

        if (existingStory && existingStory[0].author !== connectedAuthor) {
          alert(`The title "${title}" already exists and is owned by another author. Please choose a different title.`);
          return;
        }

        let storyId;
        if (existingStory) {
          storyId = existingStory[0].id;
        } else {
          storyId = await tablelandUtils.saveStory(title, connectedAddress ? connectedAddress : "Unknown");
          console.log("This is story id " + storyId);
        }
        if (storyId !== null) {
          console.log(storyId);
          await tablelandUtils.saveNFTImages(storyId, "Teast", prompt);
          router.push(`/stories/${title}/nfts`);
        } else {
          alert("Failed to save the story. Please try again.");
        }
      } else {
        alert("Title is required to mint NFTs.");
      }
    } catch (error) {
      console.error("Error minting NFTs:", error);
      alert("Error minting NFTs. Please try again.");
    }
  };
  const handleMintNFT = async (image: string) => {
    await handleSaveImageToTableland(image);
  };

  const handleSaveImageToTableland = async (imageUrl: string) => {
    try {
      if (title) {
        const existingStory = await tablelandUtils.getStoryByTitle(title);
        const connectedAuthor = connectedAddress || "Unknown";
        console.log(existingStory);

        if (existingStory && existingStory.length != 0) {
          if (existingStory[0].author !== connectedAuthor) {
            alert(
              `The title "${title}" already exists and is owned by another author. Please choose a different title.`,
            );
            return;
          }
        }
        let storyId;
        if (existingStory != null && existingStory.length != 0) {
          storyId = existingStory[0].id;
        } else {
          storyId = await tablelandUtils.saveStory(title, connectedAddress ? connectedAddress : "Unknown");
          console.log("This is story id " + storyId);
        }
        if (storyId !== null) {
          console.log(storyId);
          await tablelandUtils.saveNFTImages(storyId, imageUrl, inputMessage);
        } else {
          alert("Failed to save the story. Please try again.");
        }
      } else {
        alert("Title is required to mint NFTs.");
      }
    } catch (error) {
      console.error("Error saving image to Tableland:", error);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="container mx-auto my-5">
          <h1 className="text-4xl text-center font-bold mb-5">Story Generator</h1>
          <label htmlFor="titleInput">Title: </label>
          <input
            id="titleInput"
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Enter the story title"
            className="border border-gray-300 rounded-xl px-4 py-2 mb-4"
          />
          <div className="border border-gray-300 bg-slate-700 rounded-lg p-4">
            <div ref={chatContainerRef} className="h-96 overflow-y-auto hide-scrollbar px-10 pt-10">
              {messages.map((message, index) => (
                <div key={index} className={`mb-2 ${message.sender === "User" ? "text-right" : "text-left"}`}>
                  <span
                    className={`inline-block px-2 py-1 rounded ${
                      message.sender === "User" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {message.text}
                  </span>
                  {message.sender === "Bot" && message.image && (
                    <div className="w-1/2 mx-auto">
                      <div className="relative">
                        <img src={message.image} alt={`Generated Image ${index}`} className="w-full" />
                        <div className="absolute inset-x-0 bottom-2">
                          <button
                            onClick={() => message.image && handleMintNFT(message.image)}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-auto block"
                          >
                            Mint NFT
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {isBotTyping && (
                <div className="text-left mt-2">
                  <span className="inline-block bg-gray-200 text-gray-800 px-5 py-2 rounded">
                    <div className="dot-typing">...</div>
                  </span>
                </div>
              )}
              {imageMessage && (
                <div className="w-1/2 mx-auto">
                  <div className="relative">
                    <img src={imageMessage.image} alt="Generated Image" className="w-full" />
                    <div className="absolute inset-x-0 bottom-2">
                      <button
                        onClick={() => imageMessage?.image && handleMintNFT(imageMessage.image)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-auto block"
                      >
                        Mint NFT
                      </button>
                    </div>
                  </div>
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
          <div className="flex justify-center gap-5">
            <button
              onClick={handleSaveStory}
              disabled={isSaving}
              className="btn btn-outline rounded-md mt-5 btn-success"
            >
              {isSaving ? "Saving..." : "Save Story"}
            </button>
            <button onClick={handleMintNFTs} className="btn btn-outline rounded-md mt-5 btn-primary">
              Mint Random NFT Based On Story
            </button>
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
