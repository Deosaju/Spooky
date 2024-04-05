// TablelandService.ts
import { Database } from "@tableland/sdk";
import { ethers } from "ethers";

export class TablelandService {
  private db: Database | null = null;

  async connect(): Promise<void> {
    try {
      const privateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY;
      if (!privateKey) {
        throw new Error("Private key not found in environment variables");
      }
      const wallet = new ethers.Wallet(privateKey);
      const provider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_INFURA_URL || "");
      const signer = wallet.connect(provider);
      this.db = new Database({ signer });
      console.log("Connected to Tableland database");
    } catch (error) {
      console.error("Error connecting to Tableland:", error);
      throw error;
    }
  }

  getDatabase(): Database {
    if (!this.db) {
      throw new Error("Tableland database not connected");
    }
    return this.db;
  }
}
