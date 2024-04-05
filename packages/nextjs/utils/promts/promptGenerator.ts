// promptGenerator.ts
import openai from "~~/services/openai/openai";

export const generateImagePrompts = async (story: string): Promise<string> => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are an AI assistant that helps generate image prompts from a given story. The prompts should capture the most visually interesting scenes or moments from the story. Each prompt should be concise and descriptive, focusing on the key elements that would make for a compelling image.`,
        },
        {
          role: "user",
          content: `Story: ${story}. Please generate a single best image script based on the story that gives the worlds best satisfaction. Its should be a single string`,
        },
      ],
      max_tokens: 1000,
    });

    // Check if the response and choices exist
    if (response && response.choices && response.choices.length > 0) {
      const promptsString = response.choices[0].message?.content?.trim() || "";
      return promptsString;
    } else {
      console.error("Error generating image prompts: Invalid response structure");
      return "";
    }
  } catch (error) {
    console.error("Error generating image prompts:", error);
    return "";
  }
};
