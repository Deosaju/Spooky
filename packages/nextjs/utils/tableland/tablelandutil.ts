import { Result } from "@tableland/sdk";
import { TablelandService } from "~~/services/tableland/tablelandService";

export class TablelandUtils {
  private tablelandService: TablelandService;

  constructor() {
    this.tablelandService = new TablelandService();
    this.tablelandService.connect();
  }

  async saveStory(title: string, author: string): Promise<number> {
    const query = `INSERT INTO ${process.env.NEXT_PUBLIC_TABLELAND_STORY} (title, author) VALUES (?, ?)`;
    const statement = this.tablelandService.getDatabase().prepare(query);
    await statement.bind(title, author).run();

    const selectQuery = `SELECT last_insert_rowid() as id`;
    const selectStatement = this.tablelandService.getDatabase().prepare(selectQuery);
    const result: Result<any> = await selectStatement.run();

    return result.meta.rows[0].id;
  }

  async saveNFTImages(storyId: number, imageUrls: string, prompts: string): Promise<number[]> {
    const query = `INSERT INTO ${process.env.TABLELAND_PREFIX}_nft_images (story_id, image_url, prompt) VALUES (?, ?, ?)`;
    const statement = this.tablelandService.getDatabase().prepare(query);

    const insertedIds: number[] = [];

    await statement.bind(storyId, imageUrls, prompts).run();

    const selectQuery = `SELECT last_insert_rowid() as id`;
    const selectStatement = this.tablelandService.getDatabase().prepare(selectQuery);
    const result: Result<any> = await selectStatement.run();

    insertedIds.push(result.meta.rows[0].id);

    return insertedIds;
  }

  async getNFTImagesForStory(storyId: number): Promise<any[]> {
    const query = `SELECT * FROM ${process.env.TABLELAND_PREFIX}_nft_images WHERE story_id = ?`;
    const statement = this.tablelandService.getDatabase().prepare(query);
    const result: Result<any> = await statement.bind(storyId).run();

    return result.meta.rows;
  }
}
