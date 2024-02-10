/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
import { DeleteResult, Repository } from 'typeorm';
import { User } from '../entities/User.entity';
import dataSource from '../lib/dataSource';
import { ILoginService, IUserToCreateService, ItokenService, Message } from './service';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserWithToken } from '../resolvers/common.types';
import dotenv from 'dotenv';

dotenv.config();

export default class UserService {
    db: Repository<User>;
    constructor() {
        this.db = dataSource.getRepository('User');
    }

    async getAllUsers(): Promise<Omit<User, 'password'>[]> {
        return await this.db
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.userSharedUrls', 'sharedUrls')
            .leftJoinAndSelect('user.interactions', 'interactions')
            .leftJoinAndSelect('user.files', 'files')
            .leftJoinAndSelect('user.comments', 'comments')
            .getMany();
    }

    async getUserById(id: string): Promise<User | null> {
        const user = await this.db
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.userSharedUrls', 'sharedUrls')
            .leftJoinAndSelect('user.interactions', 'interactions')
            .leftJoinAndSelect('user.files', 'files')
            .leftJoinAndSelect('user.comments', 'comments')
            .where('user.id = :id', { id })
            .getOne();
        return user;
    }

    async getUserByUsername(username: string): Promise<Omit<User, 'password'> | null> {
        const user = await this.db
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.userSharedUrls', 'sharedUrls')
            .leftJoinAndSelect('user.interactions', 'interactions')
            .leftJoinAndSelect('user.files', 'files')
            .leftJoinAndSelect('user.comments', 'comments')
            .where('user.username = :username', { username })
            .getOne();
        return user;
    }

    async getUserByEmail(email: string): Promise<User | null> {
        const user = await this.db
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.userSharedUrls', 'sharedUrls')
            .leftJoinAndSelect('user.interactions', 'interactions')
            .leftJoinAndSelect('user.files', 'files')
            .leftJoinAndSelect('user.comments', 'comments')
            .where('user.email = :email', { email })
            .getOne();
        return user;
    }

    async deleteUserById(id: string): Promise<Message> {
        const result: DeleteResult = await this.db.delete(id);
        if (result.affected === 0) return { success: false, message: `User with id: ${id} not found` };
        return { success: true, message: `User with id: ${id} deleted` };
    }

    async createUser({ email, password, username }: IUserToCreateService): Promise<Omit<User, 'password'> | Message> {
        const isEmailUsed = await this.getUserByEmail(email);
        if (isEmailUsed) {
            return {
                success: false,
                message: `User with email: ${email} already exists`,
            };
        }
        const isUsernameUsed = await this.getUserByUsername(username);
        if (isUsernameUsed) {
            return {
                success: false,
                message: `User with username: ${username} already exists`,
            };
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = this.db.create({
            email,
            password: hashedPassword,
            username,
        });
        if (!newUser) return { success: false, message: `User not created` };
        await this.db.save(newUser);
        const { password: removedPassword, ...userWithoutPassword } = newUser;
        return userWithoutPassword;
    }

    async updateUser(id: string, updatedInfos: Partial<IUserToCreateService>, user: User): Promise<Message> {
        let { email, imgUrl, password, username } = updatedInfos;
        console.log('Current email:', user?.email, 'New email:', email);
        console.log('Current username:', user?.username, 'New username:', username);
        if (email && email !== user?.email) {
            const isEmailUsed = await this.getUserByEmail(email);
            if (isEmailUsed) {
                return {
                    success: false,
                    message: `User with email: ${email} already exists`,
                };
            }
        }

        if (username && username !== user?.username) {
            const isUsernameUsed = await this.getUserByUsername(username);
            if (isUsernameUsed) {
                return {
                    success: false,
                    message: `User with username: ${username} already exists`,
                };
            }
        }

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            password = hashedPassword;
        }

        const result = await this.db.update(id, {
            email,
            imgUrl,
            password,
            username,
        });
        if (result.affected === 0) {
            return { success: false, message: `User with id: ${id} not found` };
        }
        return { success: true, message: `User with id: ${id} updated` };
    }
    async loginUser({ email, password }: ILoginService): Promise<ItokenService | Message> {
        const user = await this.getUserByEmail(email);
        if (!user) return { success: false, message: `User with email: ${email} not found` };
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) return { success: false, message: `Password is incorrect` };
        const { password: removedPassword, ...userWithoutPassword } = user;
        const token = jwt.sign(userWithoutPassword, `${process.env.JWT_SECRET}`);
        if (token) return { ...userWithoutPassword, token };
        return { success: false, message: `Token not created` };
    }

    async getAndCheckTokenWithValue(token: string | undefined): Promise<UserWithToken | Message> {
        try {
            if (token) {
                let payload = null;

                if (!token) return { success: false, message: 'Token not found' };
                payload = jwt.verify(token, `${process.env.JWT_SECRET}`);

                if (typeof payload === 'string') return { success: false, message: 'Token not valid' };
                const user = await new UserService().getUserByEmail(payload.email);

                if (!user) return { success: false, message: 'User not found' };
                const { password: removedPassword, ...userWithoutPassword } = user;

                return { user: userWithoutPassword, token };
            }
            return { success: false, message: 'No header authorization provided' };
        } catch (err) {
            console.log('error', err);
            return { success: false, message: 'Token not valid' };
        }
    }

    async getAndCheckToken(authorization: string | undefined): Promise<UserWithToken | Message> {
        try {
            if (authorization) {
                let payload = null;
                let token = authorization.split(' ').length === 1 ? authorization : authorization.split(' ')[1]; // sur "Bearer <token>" on récupère le token

                if (!token) return { success: false, message: 'Token not found' };
                payload = jwt.verify(token, `${process.env.JWT_SECRET}`);

                if (typeof payload === 'string') return { success: false, message: 'Token not valid' };
                const user = await new UserService().getUserByEmail(payload.email);

                if (!user) return { success: false, message: 'User not found' };
                const { password: removedPassword, ...userWithoutPassword } = user;

                return { user: userWithoutPassword, token };
            }
            return { success: false, message: 'No header authorization provided' };
        } catch (err) {
            console.log('error', err);
            return { success: false, message: 'Token not valid' };
        }
    }
}
