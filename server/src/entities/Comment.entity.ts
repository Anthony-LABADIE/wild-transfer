import { Column, CreateDateColumn, Entity, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from './User.entity';
import { File } from './File.entity';
import { SharedUrl } from './SharedUrl.entity';
import { Field, InputType, ObjectType } from 'type-graphql';
import { Interaction } from './Interaction.entity';

@ObjectType()
@Entity()
export class Comment {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column()
    content: string;

    @Field()
    @CreateDateColumn()
    createdAt: Date;

    @Field()
    @UpdateDateColumn()
    updatedAt: Date;

    @Field(() => User)
    @ManyToOne(() => User, (user) => user.comments)
    author: User;

    @Field(() => File, { nullable: true })
    @ManyToOne(() => File, (file) => file.comments)
    file: File;

    @Field(() => SharedUrl, { nullable: true })
    @ManyToOne(() => SharedUrl, (sharedUrl) => sharedUrl.comments)
    sharedUrl: SharedUrl;

    @Field(() => [Interaction], { nullable: true })
    @OneToMany(() => Interaction, (interaction) => interaction.comment)
    @JoinTable()
    interactions: Interaction[];
}

@InputType()
export class CommentToCreate {
    @Field()
    content: string;

    @Field()
    authorId: string;

    @Field({ nullable: true })
    fileId?: string;

    @Field({ nullable: true })
    sharedUrlId?: string;
}

@InputType()
export class CommentToUpdate {
    @Field({ nullable: true })
    content?: string;
}
