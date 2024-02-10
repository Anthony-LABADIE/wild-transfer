import { DeleteResult, Repository } from 'typeorm';
import dataSource from '../lib/dataSource';
import { IFileToCreateService, IFileToUpdateService, Message } from './service';
import { File } from '../entities/File.entity';

export default class FileService {
    db: Repository<File>;
    constructor() {
        this.db = dataSource.getRepository('File');
    }

    async getAllFiles(): Promise<File[]> {
        return await this.db
            .createQueryBuilder('file')
            .leftJoinAndSelect('file.author', 'author')
            .leftJoinAndSelect('file.comments', 'comments')
            .leftJoinAndSelect('file.sharedUrls', 'sharedUrls')
            .getMany();
    }

    async getAllPublicFiles(): Promise<File[]> {
        return await this.db
            .createQueryBuilder('file')
            .leftJoinAndSelect('file.author', 'author')
            .where('file.isPublic = :isPublic', { isPublic: true })
            .getMany();
    }

    async getAllByAuthorId(id: string): Promise<File[]> {
        return await this.db
            .createQueryBuilder('file')
            .leftJoinAndSelect('file.author', 'author')
            .leftJoinAndSelect('file.comments', 'comments')
            .leftJoinAndSelect('file.sharedUrls', 'sharedUrls')
            .where('author.id = :id', { id })
            .getMany();
    }

    async getFileById(id: string): Promise<File | undefined> {
        const file = await this.db
            .createQueryBuilder('file')
            .leftJoinAndSelect('file.author', 'author')
            .leftJoinAndSelect('file.comments', 'comments')
            .leftJoinAndSelect('file.sharedUrls', 'sharedUrls')
            .where('file.id = :id', { id })
            .getOne();
        return file ?? undefined;
    }

    async createFile({ title, format, description, duration, isPublic, url, author }: IFileToCreateService): Promise<File | Message> {
        try {
            const newFile: File = this.db.create({
                title,
                format,
                description,
                duration,
                isPublic,
                url,
                author,
            });
            return await this.db.save(newFile);
        } catch (error) {
            console.log(error);
            return { success: false, message: 'something went wrong' };
        }
    }

    async updateFile({ id, ...other }: { id: string } & IFileToUpdateService): Promise<File | Message> {
        const fileToUpdate = await this.getFileById(id);

        if (!fileToUpdate) {
            return { success: false, message: 'File not found' };
        }

        const merge = this.db.merge(fileToUpdate, other);

        try {
            await this.db.save(merge);
            return { success: true, message: 'File updated successfully' };
        } catch (error) {
            return { success: false, message: 'File has not been updated' };
        }
    }

    async deleteFile(id: string): Promise<Message> {
        const result: DeleteResult = await this.db.delete(id);
        if (result.affected === 1) return { success: true, message: 'File deleted successfully' };
        return { success: false, message: 'File not found' };
    }
}
