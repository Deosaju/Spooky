// imageGenerator.ts
import { RateLimitError } from "openai";
import openai from "~~/services/openai/openai";

export const generateImagesFromPrompts = async (prompt: string): Promise<string> => {
  try {
    const response = await openai.images.generate({
      prompt: prompt,
      n: 1,
      size: "1024x1024",
    });

    if (response.data && response.data.length > 0) {
      const imageUrl = response.data[0].url ? response.data[0].url : "";
      return imageUrl;
    } else {
      throw RateLimitError;
    }
  } catch (error) {
    console.error("Error generating images:", error);
    return "";
  }
};
