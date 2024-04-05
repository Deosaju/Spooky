import { Result } from "@tableland/sdk";
import { TablelandService } from "~~/services/tableland/tablelandService";

export class TablelandUtils {
  private tablelandService: TablelandService;

  constructor() {
    this.tablelandService = new TablelandService();
    this.tablelandService.connect();
  }

  async getStoryByTitle(title: string): Promise<any[] | null> {
    const query = `SELECT id ,author ,title FROM ${process.env.NEXT_PUBLIC_TABLELAND_STORY} WHERE title = ? LIMIT 1`;
    const statement = this.tablelandService.getDatabase().prepare(query);
    const result = await statement.bind(title).run();

    if (result.success) {
      return result.results;
    } else {
      return null;
    }
  }

  async saveStory(title: string, author: string): Promise<any[] | null> {
    const insertQuery = `INSERT INTO ${process.env.NEXT_PUBLIC_TABLELAND_STORY} (title, author) VALUES (?, ?)`;
    const insertStatement = this.tablelandService.getDatabase().prepare(insertQuery);
    await insertStatement.bind(title, author).run();

    const selectQuery = `SELECT MAX(id) as id FROM ${process.env.NEXT_PUBLIC_TABLELAND_STORY}`;
    const selectStatement = this.tablelandService.getDatabase().prepare(selectQuery);
    const result: Result<any> = await selectStatement.run();

    if (result.success) {
      return result.results;
    } else {
      return null;
    }
  }

  async saveNFTImages(storyId: number, imageUrls: string, prompts: string): Promise<number[]> {
    const insertQuery = `INSERT INTO ${process.env.NEXT_PUBLIC_TABLELAND_NFT} (story_id, image_url, prompt) VALUES (?, ?, ?)`;
    const insertStatement = this.tablelandService.getDatabase().prepare(insertQuery);
    const result: Result<any> = await insertStatement.bind(storyId, imageUrls, prompts).run();
    return result.meta.rows;
  }

  async getNFTImagesForStory(storyId: number): Promise<any[]> {
    const query = `SELECT * FROM ${process.env.NEXT_PUBLIC_TABLELAND_NFT} WHERE story_id = ?`;
    const statement = this.tablelandService.getDatabase().prepare(query);
    const result: Result<any> = await statement.bind(storyId).run();
    return result.meta.rows;
  }
}
