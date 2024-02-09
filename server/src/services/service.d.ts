import { Comment } from '../entities/Comment.entity';
import { Emoji } from '../entities/Emoji.entity';
import { File } from '../entities/File.entity';
import { SharedUrl } from '../entities/SharedUrl.entity';
import { User, UserWithoutPassword } from '../entities/User.entity';

export interface Message {
    success: boolean;
    message: string;
}

export interface IUserToCreateService {
    username: string;
    email: string;
    imgUrl?: string;
    password: string;
}

export interface IFileToCreateService {
    title?: string;
    description: string;
    format: string;
    duration: string;
    isPublic: boolean;
    url: string;
    author: Omit<User, 'password'>;
}

export interface IFileToUpdateService {
    title?: string;
    description?: string;
    format?: string;
    duration?: string;
    isPublic?: boolean;
    url?: string;
    author?: Omit<User, 'password'>;
}

export interface ICommentToCreateService {
    content: string;
    author: Omit<User, 'password'>;
    file?: File | {};
    sharedUrl?: SharedUrl | {};
}

export interface ISharedUrlToCreateService {
    title: string;
    author: User;
    endAt?: Date;
}

export interface ISharedUrlToUpdateService {
    title?: string;
    endAt?: Date;
}

export interface IInteractionToCreateService {
    author: Omit<User, 'password'>;
    comment?: Comment;
    file?: File;
    emoji: Emoji;
}

export interface IInteractionToUpdateService {
    author?: Omit<User, 'password'>;
    comment?: Comment;
    file?: File;
    emoji?: Emoji;
}

export interface ILoginService {
    email: string;
    password: string;
}

export interface ItokenService extends Partial<UserWithoutPassword> {
    token: string;
}

export interface IUserSharedUrlToCreateService {
    user?: User | undefined;
    sharedUrl: SharedUrl;
    email: string;
}

export interface IEmojiToCreateService {
    name: string;
    iconName: string;
    iconColor?: string;
    bgColor?: string;
}

export interface ICheckTokenResponse {
    user: UserWithoutPassword;
    token: string;
}
