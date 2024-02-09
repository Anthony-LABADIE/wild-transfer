import { Repository } from "typeorm";
import { Interaction } from "../entities/Interaction.entity";
import dataSource from "../lib/dataSource";
import {
  IInteractionToCreateService,
  IInteractionToUpdateService,
  Message,
} from "./service";

export default class InteractionService {
  db: Repository<Interaction>;
  constructor() {
    this.db = dataSource.getRepository("Interaction");
  }

  async getAllInteractions(): Promise<Interaction[]> {
    return await this.db
      .createQueryBuilder("interaction")
      .leftJoinAndSelect("interaction.author", "user")
      .leftJoinAndSelect("interaction.comment", "comment")
      .leftJoinAndSelect("interaction.file", "file")
      .leftJoinAndSelect("interaction.emoji", "emoji")
      .getMany();
  }

  async getInteractionByAuthorIdAndCommentId(
    authorId: string,
    commentId: string
  ): Promise<Interaction | null> {
    const interaction = await this.db
      .createQueryBuilder("interaction")
      .leftJoinAndSelect("interaction.author", "user")
      .leftJoinAndSelect("interaction.comment", "comment")
      .leftJoinAndSelect("interaction.emoji", "emoji")
      .where("interaction.authorId = :authorId", { authorId })
      .andWhere("interaction.commentId = :commentId", { commentId })
      .getOne();
    return interaction;
  }

  async getInteractionByCommentId(commentId: string): Promise<Interaction[]> {
    const interactions = await this.db
      .createQueryBuilder("interaction")
      .leftJoinAndSelect("interaction.author", "user")
      .leftJoinAndSelect("interaction.comment", "comment")
      .leftJoinAndSelect("interaction.emoji", "emoji")
      .where("interaction.commentId = :commentId", { commentId })
      .getMany();
    return interactions;
  }

  async getInteractionById(id: string): Promise<Interaction | null> {
    const interaction = await this.db
      .createQueryBuilder("interaction")
      .leftJoinAndSelect("interaction.author", "user")
      .leftJoinAndSelect("interaction.comment", "comment")
      .leftJoinAndSelect("interaction.emoji", "emoji")
      .where("interaction.id = :id", { id })
      .getOne();
    return interaction;
  }

  async createInteraction({
    emoji,
    author,
    comment,
    file,
  }: IInteractionToCreateService): Promise<Interaction | Message> {
    try {
      const newInteraction: Interaction = this.db.create({
        author,
        comment,
        file,
        emoji,
      });
      return await this.db.save(newInteraction);
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: `something went wrong while creating the interaction: ${error}`,
      };
    }
  }

  async updateInteraction({
    id,
    emoji,
    author,
    comment,
  }: {
    id: string;
  } & IInteractionToUpdateService): Promise<Message> {
    const interaction = await new InteractionService().getInteractionById(id);
    if (!interaction) {
      return { success: false, message: "interaction not found" };
    }
    if (
      interaction.author.id === author?.id &&
      interaction.emoji.id === emoji?.id &&
      interaction.comment?.id === comment?.id
    ) {
      return await new InteractionService().deleteInteraction(id);
    }
    const result = await this.db.update(id, { emoji });
    if (result.affected === 1) {
      return { success: true, message: "interaction updated" };
    }
    return { success: false, message: "something went wrong" };
  }

  async deleteInteraction(id: string): Promise<Message> {
    const result = await this.db.delete(id);
    if (result.affected === 1) {
      return { success: true, message: "interaction deleted" };
    }
    return { success: false, message: "something went wrong" };
  }
}
