import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { SharedUrl } from "./SharedUrl.entity";
import { User } from "./User.entity";
import { Field, InputType, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class UserSharedUrl {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column()
  email: string;

  @Field(() => SharedUrl)
  @ManyToOne(() => SharedUrl, (sharedUrl) => sharedUrl.userSharedUrls, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "sharedUrlId" })
  sharedUrl: SharedUrl;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.userSharedUrls, { nullable: true })
  @JoinColumn({ name: "userId" })
  user?: User;
}

@InputType()
export class UserSharedUrlToCreate {
  @Field()
  email: string;

  @Field()
  sharedUrlId: string;

  @Field()
  userId?: string;
}
