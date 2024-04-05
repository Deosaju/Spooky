// StoryContract.ts
import { ethers } from "ethers";
import deployedContracts from "~~/contracts/deployedContracts";

interface Story {
  id: number;
  title: string;
  content: string;
  author: string;
}

export class StoryContract {
  private contract: ethers.Contract | null = null;

  constructor() {
    const { abi, address } = deployedContracts[421614].Spooky;
    if (typeof window !== "undefined" && window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum as ethers.providers.ExternalProvider);
      const signer = provider.getSigner();
      this.contract = new ethers.Contract(address, abi, signer);
    } else {
      console.warn("Window or window.ethereum is not available");
      this.contract = null;
    }
  }

  async saveStory(title: string, content: string): Promise<void> {
    try {
      if (!this.contract) {
        throw new Error("Contract not initialized");
      }
      const storyId = Math.floor(Math.random() * 1000000);
      const tx = await this.contract.createStory(storyId, title, content);
      await tx.wait();
    } catch (error) {
      throw new Error("Error saving story to the smart contract");
    }
  }

  async getAllStories(): Promise<Story[]> {
    try {
      if (!this.contract) {
        throw new Error("Contract not initialized");
      }
      const stories = await this.contract.getAllStories();
      return stories.map((story: any) => ({
        id: story.id.toNumber(),
        title: story.title,
        content: story.content,
        author: story.author,
      }));
    } catch (error) {
      console.error("Error fetching stories from the smart contract:", error);
      return [];
    }
  }

  async getStory(storyId: number): Promise<Story | null> {
    try {
      if (!this.contract) {
        throw new Error("Contract not initialized");
      }
      const story = await this.contract.getStory(storyId);
      return {
        id: story[0].toNumber(),
        title: story[1],
        content: story[2],
        author: story[3],
      };
    } catch (error) {
      console.error("Error fetching story from the smart contract:", error);
      return null;
    }
  }
}
