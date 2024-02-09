import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User, UserWithoutPassword } from './User.entity';
import { Comment } from './Comment.entity';
import { SharedUrl } from './SharedUrl.entity';
import { Field, InputType, ObjectType } from 'type-graphql';
import { Interaction } from './Interaction.entity';

@ObjectType()
@Entity()
export class File {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column()
    title: string;

    @Field()
    @Column()
    description: string;

    @Field()
    @Column()
    format: string;

    @Field()
    @Column()
    duration: string;

    @Field()
    @Column()
    isPublic: boolean;

    @Field()
    @Column({ unique: true })
    url: string;

    @Field()
    @CreateDateColumn()
    createdAt: Date;

    @Field()
    @UpdateDateColumn()
    updatedAt: Date;

    @Field(() => UserWithoutPassword)
    @ManyToOne(() => User, (user) => user.files, { eager: true })
    author: Omit<User, 'password'>;

    @Field(() => [Comment])
    @OneToMany(() => Comment, (comment) => comment.file)
    @JoinTable()
    comments: Comment[];

    @Field(() => [SharedUrl])
    @ManyToMany(() => SharedUrl, (sharedUrl) => sharedUrl.files)
    sharedUrls: SharedUrl[];

    @Field(() => [Interaction])
    @ManyToMany(() => Interaction, (interaction) => interaction.file)
    @JoinTable()
    interactions: Interaction[];
}

@InputType()
export class FileToCreate {
    @Field()
    title: string;

    @Field()
    description: string;

    @Field()
    format: string;

    @Field()
    duration: string;

    @Field()
    isPublic: string;

    @Field()
    url: string;

    @Field()
    authorUsername: string;
}

@InputType()
export class FileToUpdate {
    @Field({ nullable: true })
    title: string;

    @Field({ nullable: true })
    description: string;

    @Field({ nullable: true })
    format: string;

    @Field({ nullable: true })
    duration: string;

    @Field({ nullable: true })
    isPublic: boolean;

    @Field({ nullable: true })
    url: string;

    @Field({ nullable: true })
    username: string;
}
