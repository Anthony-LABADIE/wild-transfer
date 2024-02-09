import { Arg, Mutation, Query, Resolver } from "type-graphql";
import CommentService from "../services/Comment.service";
import {
  Comment,
  CommentToCreate,
  CommentToUpdate,
} from "../entities/Comment.entity";
import { MessageGql } from "./common.types";
import UserService from "../services/User.service";
import FileService from "../services/File.service";
import SharedUrlService from "../services/SharedUrl.service";

@Resolver()
export class CommentResolver {
  @Query(() => [Comment])
  async commentsList(): Promise<Comment[]> {
    return await new CommentService().getAllComments();
  }

  @Query(() => Comment)
  async commentById(@Arg("id") id: string): Promise<Comment | undefined> {
    return await new CommentService().getCommentById(id);
  }

  @Mutation(() => Comment)
  async createComment(
    @Arg("commentToCreate") commentToCreate: CommentToCreate
  ): Promise<Comment | MessageGql> {
    const { content, authorId, fileId, sharedUrlId } = commentToCreate;
    const author = await new UserService().getUserById(authorId);
    const file =
      (fileId && (await new FileService().getFileById(fileId))) || {};
    const sharedUrl =
      (sharedUrlId &&
        (await new SharedUrlService().getSharedUrlById(sharedUrlId))) ||
      {};

    if (!author) {
      return { success: false, message: "author not found" };
    }
    if (fileId && !("id" in file)) {
      return { success: false, message: "file not found" };
    }
    if (sharedUrlId && !("id" in sharedUrl)) {
      return { success: false, message: "sharedUrl not found" };
    }
    if ("id" in author) {
      const newComment = await new CommentService().createComment({
        content,
        author,
        file,
        sharedUrl,
      });
      return newComment;
    }
    return { success: false, message: "something went wrong" };
  }

  @Mutation(() => MessageGql)
  async updateComment(
    @Arg("id") id: string,
    @Arg("commentToUpdate") commentToUpdate: CommentToUpdate
  ): Promise<MessageGql> {
    const updatedComment = await new CommentService().updateComment({
      id,
      ...commentToUpdate,
    });
    return updatedComment;
  }

  @Mutation(() => MessageGql)
  async deleteComment(@Arg("id") id: string): Promise<MessageGql> {
    return await new CommentService().deleteComment(id);
  }
}
