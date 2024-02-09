import { Repository } from 'typeorm';
import { UserSharedUrl } from '../entities/UserSharedUrl.entity';
import dataSource from '../lib/dataSource';
import { IUserSharedUrlToCreateService, Message } from './service';

export default class UserSharedUrlService {
    db: Repository<UserSharedUrl>;
    constructor() {
        this.db = dataSource.getRepository('UserSharedUrl');
    }
    async getAllUserSharedUrls(): Promise<UserSharedUrl[]> {
        return await this.db
            .createQueryBuilder('userSharedUrl')
            .leftJoinAndSelect('userSharedUrl.sharedUrl', 'sharedUrl')
            .leftJoinAndSelect('userSharedUrl.user', 'user')
            .getMany();
    }

    async getUserSharedUrlById(id: string): Promise<UserSharedUrl | undefined> {
        const userSharedUrl = await dataSource.getRepository(UserSharedUrl).findOne({
            where: { id },
            relations: ['sharedUrl', 'user'],
        });
        return userSharedUrl ?? undefined;
    }

    async getUserSharedUrlsByUserId(userId: string): Promise<UserSharedUrl[]> {
        const userSharedUrls = await this.db.find({
            where: { user: { id: userId } },
            relations: ['sharedUrl', 'user'],
        });
        return userSharedUrls ?? [];
    }

    async getUserSharedUrlsByEmail(email: string): Promise<UserSharedUrl[]> {
        const userSharedUrls = await dataSource.getRepository(UserSharedUrl).find({
            where: { email },
            relations: ['sharedUrl', 'user'],
        });
        return userSharedUrls ?? [];
    }

    async createUserSharedUrl({ sharedUrl, user, email }: IUserSharedUrlToCreateService): Promise<UserSharedUrl> {
        const newUserSharedUrl: UserSharedUrl = this.db.create({
            sharedUrl,
            user,
            email,
        });
        return await this.db.save(newUserSharedUrl);
    }
}
