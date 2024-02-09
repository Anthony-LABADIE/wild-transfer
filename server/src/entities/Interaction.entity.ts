import { Field, InputType, ObjectType } from "type-graphql";
import { Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Comment } from "./Comment.entity";
import { File } from "./File.entity";
import { User } from "./User.entity";
import { Emoji } from "./Emoji.entity";

@ObjectType()
@Entity()
export class Interaction {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field(() => Emoji)
  @ManyToOne(() => Emoji, (emoji) => emoji.interactions)
  @JoinTable()
  emoji: Emoji;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.interactions)
  @JoinTable()
  author: User;

  @Field(() => Comment, { nullable: true })
  @ManyToOne(() => Comment, (comment) => comment.interactions)
  @JoinTable()
  comment?: Comment;

  @Field(() => File, { nullable: true })
  @ManyToOne(() => File, (file) => file.interactions)
  @JoinTable()
  file?: File;
}

@InputType()
export class InteractionToCreate {
  @Field()
  emojiId: string;

  @Field()
  authorId: string;

  @Field({ nullable: true })
  commentId?: string;

  @Field({ nullable: true })
  fileId?: string;
}

@InputType()
export class InteractionToUpdate {
  @Field()
  emojiId?: string;
}
