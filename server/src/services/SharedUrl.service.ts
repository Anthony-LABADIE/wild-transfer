import { DeleteResult, Repository, getManager, getRepository } from 'typeorm';
import dataSource from '../lib/dataSource';
import { ISharedUrlToCreateService, Message } from './service';
import { SharedUrl } from '../entities/SharedUrl.entity';
import { User } from '../entities/User.entity';
import { File } from '../entities/File.entity';
import { UserSharedUrl } from '../entities/UserSharedUrl.entity';
import FileService from './File.service';
import { Arg } from 'type-graphql';
import UserService from './User.service';
import UserSharedUrlService from './UserSharedUrl.service';

export default class SharedUrlService {
    db: Repository<SharedUrl>;

    constructor() {
        this.db = dataSource.getRepository('SharedUrl');
    }

    async getAllSharedUrls(): Promise<SharedUrl[]> {
        return await this.db
            .createQueryBuilder('sharedUrl')
            .leftJoinAndSelect('sharedUrl.comments', 'comments')
            .leftJoinAndSelect('sharedUrl.files', 'files')
            .leftJoinAndSelect('sharedUrl.userSharedUrls', 'userSharedUrls')
            .leftJoinAndSelect('sharedUrl.author', 'author')
            .getMany();
    }

    async getSharedUrlById(id: string): Promise<SharedUrl | undefined> {
        const sharedUrl = await this.db
            .createQueryBuilder('sharedUrl')
            .leftJoinAndSelect('sharedUrl.comments', 'comments')
            .leftJoinAndSelect('sharedUrl.files', 'files')
            .leftJoinAndSelect('files.author', 'filesAuthor')
            .leftJoinAndSelect('sharedUrl.userSharedUrls', 'userSharedUrls')
            .leftJoinAndSelect('sharedUrl.author', 'author')
            .where('sharedUrl.id = :id', { id })
            .getOne();
        return sharedUrl ?? undefined;
    }

    async getSharedUrlsByAuthorId(authorId: string): Promise<SharedUrl[]> {
        const sharedUrls = await this.db
            .createQueryBuilder('sharedUrl')
            .leftJoinAndSelect('sharedUrl.comments', 'comments')
            .leftJoinAndSelect('sharedUrl.files', 'files')
            .leftJoinAndSelect('sharedUrl.userSharedUrls', 'userSharedUrls')
            .leftJoinAndSelect('sharedUrl.author', 'author')
            .where('author.id = :authorId', { authorId })
            .getMany();
        return sharedUrls ?? [];
    }

    async createSharedUrl({ title, author, endAt }: ISharedUrlToCreateService): Promise<SharedUrl | Message> {
        try {
            if (!endAt) {
                endAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
            }
            const newSharedUrl: SharedUrl = this.db.create({
                title: `${new Date().getTime()}_${title}`,
                author,
                endAt,
            });
            return await this.db.save(newSharedUrl);
        } catch (error) {
            console.log(error);
            return { success: false, message: 'something went wrong' };
        }
    }

    async associateFilesToSharedUrl(files: string[], sharedUrlId: string) {
        return new Promise<void>(async (resolve, reject) => {
            try {
                const sharedUrl = await this.db.findOne({
                    where: { id: sharedUrlId },
                    relations: ['files'],
                });

                if (!sharedUrl) throw new Error('SharedUrl not found');
                let filesToPush: Promise<File | undefined>[] = files.map((file) => {
                    const fileToPush = new FileService().getFileById(file);
                    return fileToPush;
                });
                Promise.all(filesToPush).then(async (files) => {
                    files.map((file) => {
                        if (file && !sharedUrl.files.includes(file)) sharedUrl.files.push(file);
                    });

                    await this.db.save(sharedUrl);
                    resolve();
                });
            } catch (error) {
                console.error('Something went wrong while associating files to SharedUrl', error);
                reject(error);
            }
        });
    }
    async removeFilesFromSharedUrl(files: string[], sharedUrlId: string) {
        return new Promise<void>(async (resolve, reject) => {
            try {
                const sharedUrl = await this.db.findOne({
                    where: { id: sharedUrlId },
                    relations: ['files'],
                });
                if (!sharedUrl) throw new Error('SharedUrl non trouvée.');
                let filesToRemove: Promise<File | undefined>[] = files.map((file) => {
                    const fileToRemove = new FileService().getFileById(file);
                    return fileToRemove;
                });
                Promise.all(filesToRemove).then(async (files) => {
                    files.map((file) => {
                        const index = sharedUrl.files.findIndex((f) => f.id === file?.id);
                        if (file && index !== -1) {
                            sharedUrl.files.splice(index, index + 1);
                        }
                    });
                    await this.db.save(sharedUrl);
                    resolve();
                });
            } catch (error) {
                console.error('Something went wrong while removing files from SharedUrl', error);
                reject(error);
            }
        });
    }

    async associateUserSharedUrlsToSharedUrl(emails: string[], sharedUrl: SharedUrl) {
        return new Promise<void>(async (resolve, reject) => {
            try {
                let userSharedUrls: Promise<UserSharedUrl>[] = emails.map(async (email) => {
                    const user = await new UserService().getUserByEmail(email);
                    const newUserSharedUrl = user
                        ? new UserSharedUrlService().createUserSharedUrl({
                              email,
                              sharedUrl,
                              user,
                          })
                        : new UserSharedUrlService().createUserSharedUrl({
                              email,
                              sharedUrl,
                          });
                    return newUserSharedUrl;
                });
                Promise.all(userSharedUrls).then(async (userSharedUrls) => {
                    userSharedUrls.map((userSharedUrl) => {
                        const index = sharedUrl.userSharedUrls ? sharedUrl.userSharedUrls.findIndex((f) => f.id === userSharedUrl?.id) : -1;
                        if (userSharedUrl && index == -1) {
                            sharedUrl.userSharedUrls?.push(userSharedUrl);
                        }
                    });
                    await this.db.save(sharedUrl);
                    resolve();
                });
            } catch (error) {
                reject(error);
                console.error(error);
            }
        });
    }

    async updateSharedUrl(id: string, updatedSharedUrl: Partial<SharedUrl>): Promise<SharedUrl | undefined> {
        try {
            const { title, endAt } = updatedSharedUrl;
            const newSharedUrl = await this.db.update(id, { title, endAt });
            if (newSharedUrl.affected === 0) {
                throw new Error('Aucune URL de partage trouvée avec cet ID.');
            }
            return (await this.db.findOne({ where: { id } })) ?? undefined;
        } catch (error) {
            console.error('Something went wrong while updating SharedUrl', error);
            throw error;
        }
    }

    async deleteSharedUrl(id: string): Promise<Message> {
        try {
            const deleteResult = await this.db.delete(id);

            if (deleteResult.affected === 0) {
                throw new Error('Aucune URL de partage trouvée avec cet ID.');
            }

            return { success: true, message: 'SharedUrl deleted' };
        } catch (error) {
            console.error("Erreur lors de la suppression de l'URL de partage", error);
            throw error;
        }
    }
}
