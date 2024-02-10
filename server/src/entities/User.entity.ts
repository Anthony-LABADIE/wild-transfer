import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinTable, OneToMany } from 'typeorm';
import { File } from './File.entity';
import { Comment } from './Comment.entity';
import { SharedUrl } from './SharedUrl.entity';
import { Field, InputType, ObjectType } from 'type-graphql';
import { UserSharedUrl } from './UserSharedUrl.entity';
import { Interaction } from './Interaction.entity';

export enum Role {
    ADMIN = 'ADMIN',
    USER = 'USER',
    USER_PREMIUM = 'USER_PREMIUM',
    SUPER_ADMIN = 'SUPER_ADMIN',
}

@ObjectType()
@Entity()
export class User {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column({ unique: true })
    username: string;

    @Field()
    @Column({ unique: true })
    email: string;

    @Field()
    @Column()
    password: string;

    @Field()
    @Column({ nullable: true })
    imgUrl: string;

    @Field()
    @CreateDateColumn()
    createdAt: Date;

    @Field()
    @UpdateDateColumn()
    updatedAt: Date;

    @Field()
    @Column({ type: 'enum', enum: Role, default: Role.USER })
    role: Role;

    @Field(() => [File])
    @OneToMany(() => File, (file) => file.author)
    @JoinTable()
    files: File[];

    @Field(() => [Comment], { nullable: true })
    @OneToMany(() => Comment, (comment) => comment.author)
    @JoinTable()
    comments: Comment[];

    @Field(() => [SharedUrl], { nullable: true })
    @JoinTable()
    @OneToMany(() => SharedUrl, (sharedUrl) => sharedUrl.author)
    sharedUrls?: SharedUrl[];

    @Field(() => [UserSharedUrl], { nullable: true })
    @OneToMany(() => UserSharedUrl, (userSharedUrl) => userSharedUrl.user)
    @JoinTable()
    userSharedUrls?: UserSharedUrl[];

    @Field(() => [Interaction], { nullable: true })
    @OneToMany(() => Interaction, (interaction) => interaction.author)
    @JoinTable()
    interactions?: Interaction[];
}

@ObjectType()
export class UserWithoutPassword {
    @Field()
    id: string;

    @Field()
    username: string;

    @Field()
    email: string;

    @Field({ nullable: true })
    imgUrl?: string;

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;

    @Field()
    role: Role;

    @Field(() => [File])
    files: File[];

    @Field(() => [Comment])
    comments: Comment[];

    @Field(() => [SharedUrl])
    sharedUrls?: SharedUrl[];
}

@InputType()
export class UserCreateInput {
    @Field()
    username: string;

    @Field()
    email: string;

    @Field()
    password: string;

    @Field({ nullable: true })
    imgUrl?: string;
}

@InputType()
export class UserUpdateInput {
    @Field({ nullable: true })
    username: string;

    @Field({ nullable: true })
    email: string;

    @Field({ nullable: true })
    password: string;

    @Field({ nullable: true })
    imgUrl: string;

    @Field({ nullable: true })
    oldPassword: string;
}

@InputType()
export class UserLoginInput {
    @Field()
    email: string;

    @Field()
    password: string;
}

@ObjectType()
export class UserLogin extends UserWithoutPassword {
    @Field({ nullable: true })
    @Column()
    token: string;
}
