import { Repository } from "typeorm";
import { Emoji } from "../entities/Emoji.entity";
import dataSource from "../lib/dataSource";
import { IEmojiToCreateService, Message } from "./service";

export default class EmojiService {
  db: Repository<Emoji>;
  constructor() {
    this.db = dataSource.getRepository("Emoji");
  }

  async getAllEmojis(): Promise<Emoji[]> {
    return await this.db.find();
  }

  async getEmojiById(id: string): Promise<Emoji | undefined> {
    const emoji = await this.db
      .createQueryBuilder("emoji")
      .where("emoji.id = :id", { id })
      .getOne();
    return emoji ?? undefined;
  }

  async createEmoji(emoji: IEmojiToCreateService): Promise<Emoji | Message> {
    try {
      const newEmoji = this.db.create(emoji);
      return await this.db.save(newEmoji);
    } catch (error) {
      return {
        success: false,
        message: `Error while creating emoji : ${error}`,
      };
    }
  }

  async deleteEmoji(id: string): Promise<Message> {
    const result = await this.db.delete(id);
    if (result.affected === 1) {
      return { success: true, message: "emoji deleted" };
    }
    return { success: false, message: "emoji not found" };
  }
}
