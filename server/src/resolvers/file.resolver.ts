import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { File, FileToCreate, FileToUpdate } from '../entities/File.entity';
import FileService from '../services/File.service';
import { MessageGql } from './common.types';
import UserService from '../services/User.service';

import fs from 'fs';

@Resolver()
export class FileResolver {
    @Query(() => [File])
    async FileList(): Promise<File[]> {
        return await new FileService().getAllFiles();
    }

    @Query(() => [File])
    async FileListPublic(): Promise<File[]> {
        return await new FileService().getAllPublicFiles();
    }

    @Query(() => [File])
    async FileListByAuthorId(@Arg('id') id: string): Promise<File[]> {
        return await new FileService().getAllByAuthorId(id);
    }

    @Query(() => File)
    async FileById(@Arg('id') id: string): Promise<File | undefined> {
        return await new FileService().getFileById(id);
    }

    @Mutation(() => File)
    async CreateFile(@Arg('fileToCreate') fileToCreate: FileToCreate): Promise<File | MessageGql> {
        const { title, description, format, duration, url, isPublic, authorUsername } = fileToCreate;
        const author = await new UserService().getUserByUsername(authorUsername);
        const isPublicBool = isPublic === 'true' ? true : false;
        if (author) {
            const newFile = await new FileService().createFile({
                title,
                description,
                format,
                duration,
                url,
                isPublic: isPublicBool,
                author,
            });
            if (newFile && newFile instanceof File) {
                fs.copyFileSync('/uploads/tempUploads/' + newFile.url, '/uploads/finalUploads/' + newFile.url);

                if (fs.existsSync('/uploads/finalUploads/' + newFile.url)) {
                    await new FileService().updateFile({
                        id: newFile.id,
                        url: '/uploads/finalUploads/' + newFile.url,
                    });

                    try {
                        await fs.promises.rm('/uploads/tempUploads/' + newFile.url);
                        console.log(`File ${newFile.url} deleted successfully`);
                    } catch (err) {
                        console.error('ERROR:', err);
                    }
                }
            }
            return newFile;
        }
        return { success: false, message: 'something went wrong' };
    }

    @Mutation(() => MessageGql)
    async UpdateFile(@Arg('id') id: string, @Arg('fileToUpdate') fileToUpdate: FileToUpdate): Promise<File | MessageGql> {
        const updatedFile = await new FileService().updateFile({
            id,
            ...fileToUpdate,
        });
        return updatedFile;
    }

    @Mutation(() => MessageGql)
    async DeleteFile(@Arg('id') id: string): Promise<MessageGql> {
        return await new FileService().deleteFile(id);
    }
}
