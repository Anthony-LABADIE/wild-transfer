import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { File } from './File.entity';
import { Comment } from './Comment.entity';
import { Field, InputType, ObjectType } from 'type-graphql';
import { UserSharedUrl } from './UserSharedUrl.entity';
import { User } from './User.entity';

@ObjectType()
@Entity()
export class SharedUrl {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column()
    title?: string;

    @Column({ type: 'timestamp', nullable: true })
    endAt?: Date;

    @Field()
    @CreateDateColumn()
    createdAt: Date;

    @Field()
    @UpdateDateColumn()
    updatedAt: Date;

    @Field(() => User)
    @ManyToOne(() => User, (user) => user.sharedUrls)
    @JoinTable()
    author: User;

    @Field(() => [UserSharedUrl])
    @OneToMany(() => UserSharedUrl, (userSharedUrl) => userSharedUrl.sharedUrl)
    userSharedUrls: UserSharedUrl[];

    @Field(() => [Comment], { nullable: true })
    @OneToMany(() => Comment, (comment) => comment.sharedUrl, { eager: true })
    @JoinTable()
    comments: Comment[];

    @Field(() => [File])
    @ManyToMany(() => File, (file) => file.sharedUrls)
    @JoinTable()
    files: File[];
}

@InputType()
export class SharedUrlToCreate {
    @Field()
    title: string;

    @Field({ nullable: true })
    endAt?: Date;

    @Field()
    authorId: string;
}

@InputType()
export class SharedUrlToUpdate {
    @Field({ nullable: true })
    title?: string;

    @Field({ nullable: true })
    endAt?: Date;

    @Field(() => [String], { nullable: true })
    filesToAdd?: string[];

    @Field(() => [String], { nullable: true })
    filesToRemove?: string[];
}

@InputType()
export class sharedUrlToCreateWithFilesAndUsers {
    @Field()
    title: string;

    @Field({ nullable: true })
    endAt?: Date;

    @Field()
    authorId: string;

    @Field(() => [String], { nullable: true })
    filesIds?: string[];

    @Field(() => [String], { nullable: true })
    emails?: string[];
}
