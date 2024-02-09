import { Arg, Mutation, Query, Resolver, createUnionType } from "type-graphql";

import { MessageGql } from "./common.types";
import UserService from "../services/User.service";
import CommentService from "../services/Comment.service";
import InteractionService from "../services/Interaction.service";

import {
  Interaction,
  InteractionToCreate,
  InteractionToUpdate,
} from "../entities/Interaction.entity";
import FileService from "../services/File.service";
import EmojiService from "../services/Emoji.service";

const UnionMessageInteraction = createUnionType({
  name: "UnionMessageInteraction",
  types: () => [Interaction, MessageGql] as const,
  resolveType: (value) => {
    return (value as Interaction).id !== undefined ? Interaction : MessageGql;
  },
});

@Resolver()
export class InteractionResolver {
  @Query(() => [Interaction])
  async GetAllInteractions(): Promise<Interaction[]> {
    return await new InteractionService().getAllInteractions();
  }

  @Query(() => Interaction)
  async GetInteractionById(@Arg("id") id: string): Promise<Interaction | null> {
    return await new InteractionService().getInteractionById(id);
  }

  @Query(() => Interaction)
  async GetInteractionByAuthorIdAndCommentId(
    @Arg("authorId") authorId: string,
    @Arg("commentId") commentId: string
  ): Promise<Interaction | null> {
    return await new InteractionService().getInteractionByAuthorIdAndCommentId(
      authorId,
      commentId
    );
  }

  @Query(() => [Interaction])
  async GetInteractionByCommentId(
    @Arg("commentId") commentId: string
  ): Promise<Interaction[]> {
    return await new InteractionService().getInteractionByCommentId(commentId);
  }

  @Mutation(() => UnionMessageInteraction)
  async CreateInteraction(
    @Arg("InteractionToCreate")
    InteractionToCreate: InteractionToCreate
  ): Promise<Interaction | MessageGql> {
    const { emojiId, authorId, commentId, fileId } = InteractionToCreate;
    const author = await new UserService().getUserById(authorId);

    const comment = commentId
      ? await new CommentService().getCommentById(commentId)
      : undefined;

    const file = fileId
      ? await new FileService().getFileById(fileId)
      : undefined;

    const emoji = emojiId
      ? await new EmojiService().getEmojiById(emojiId)
      : undefined;

    if (author && authorId && commentId && emoji) {
      const interaction =
        await new InteractionService().getInteractionByAuthorIdAndCommentId(
          authorId,
          commentId
        );

      if (interaction !== null) {
        return new InteractionService().updateInteraction({
          id: interaction.id,
          author,
          comment,
          emoji,
        });
      } else {
        const newInteraction = await new InteractionService().createInteraction(
          {
            author,
            comment,
            file,
            emoji,
          }
        );
        return newInteraction;
      }
    }

    return { success: false, message: "something went wrong" };
  }

  @Mutation(() => MessageGql)
  async UpdateInteraction(
    @Arg("id") id: string,
    @Arg("InteractionToUpdate")
    InteractionToUpdate: InteractionToUpdate
  ): Promise<MessageGql> {
    const { emojiId } = InteractionToUpdate;
    const emoji = emojiId
      ? await new EmojiService().getEmojiById(emojiId)
      : undefined;
    return await new InteractionService().updateInteraction({
      id,
      emoji,
    });
  }

  @Mutation(() => MessageGql)
  async DeleteInteraction(@Arg("id") id: string): Promise<MessageGql> {
    return await new InteractionService().deleteInteraction(id);
  }
}
