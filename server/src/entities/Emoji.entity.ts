import { Field, InputType, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Interaction } from "./Interaction.entity";

@Entity()
@ObjectType()
export class Emoji {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  iconName: string;

  @Field({ defaultValue: "text-white" })
  @Column()
  iconColor: string;

  @Field({ defaultValue: "text-white" })
  @Column()
  bgColor: string;

  @Field(() => [Interaction], { nullable: true })
  @OneToMany(() => Interaction, (interaction) => interaction.emoji)
  @JoinTable()
  interactions?: Interaction[];
}

@InputType()
export class EmojiToCreate {
  @Field()
  name: string;

  @Field()
  iconName: string;

  @Field({ defaultValue: "text-white" })
  iconColor?: string;

  @Field({ defaultValue: "bg-gray-500" })
  bgColor?: string;
}
