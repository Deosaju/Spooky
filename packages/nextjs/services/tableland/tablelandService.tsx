// TablelandService.ts
import deployedContracts from "../../contracts/deployedContracts";
import { Database } from "@tableland/sdk";
import { ethers } from "ethers";

interface Story {
  id: number;
  title: string;
  content: string;
  author: string;
}

export class TablelandService {
  private db: Database | null = null;

  async connect(): Promise<void> {
    try {
      // Create a signer using the private key
      const privateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY;
      if (!privateKey) {
        throw new Error("Private key not found in environment variables");
      }
      const wallet = new ethers.Wallet(privateKey);
      const provider = new ethers.providers.JsonRpcProvider(
        "https://arbitrum-sepolia.infura.io/v3/d742656554e74d2a897b6139b0488b50",
      );
      const signer = wallet.connect(provider);

      // Connect to the Tableland database using the signer
      this.db = new Database({ signer });
      console.log("Connected to Tableland database");
    } catch (error) {
      console.error("Error connecting to Tableland:", error);
      throw error;
    }
  }

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

  getDatabase(): Database {
    if (!this.db) {
      throw new Error("Tableland database not connected");
    }
    return this.db;
  }
}
