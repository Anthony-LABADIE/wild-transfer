import { Arg, Mutation, Query, Resolver, createUnionType } from 'type-graphql';
import { SharedUrl, SharedUrlToCreate, SharedUrlToUpdate, sharedUrlToCreateWithFilesAndUsers } from '../entities/SharedUrl.entity';
import { MessageGql } from './common.types';
import { Message } from '../services/service';
import SharedUrlService from '../services/SharedUrl.service';
import UserService from '../services/User.service';

const UnionMessageSharedUrl = createUnionType({
    name: 'UnionMessageSharedUrl',
    types: () => [SharedUrl, MessageGql] as const,
    resolveType: (value) => {
        return (value as SharedUrl).id !== undefined ? SharedUrl : MessageGql;
    },
});

@Resolver()
export class SharedUrlResolver {
    @Query(() => [SharedUrl])
    async sharedUrlsList(): Promise<SharedUrl[]> {
        return await new SharedUrlService().getAllSharedUrls();
    }

    @Query(() => SharedUrl)
    async SharedUrlById(@Arg('id') id: string): Promise<SharedUrl | Message> {
        try {
            const sharedUrl = await new SharedUrlService().getSharedUrlById(id);
            if (!sharedUrl) {
                return { success: false, message: 'SharedUrl not found ' };
            }
            return sharedUrl;
        } catch (error) {
            console.error('Error fetching SharedUrl by ID:', error);
            return {
                success: false,
                message: `Error occurred while fetching SharedUrl with id: ${id}.`,
            };
        }
    }

    @Query(() => [SharedUrl])
    async SharedUrlByUserId(@Arg('userId') userId: string): Promise<SharedUrl[]> {
        try {
            const sharedUrls = await new SharedUrlService().getSharedUrlsByAuthorId(userId);
            return sharedUrls;
        } catch (error) {
            console.error('Error fetching SharedUrl by ID:', error);
            return [];
        }
    }

    @Mutation(() => UnionMessageSharedUrl)
    async CreateSharedUrl(@Arg('sharedUrlToCreate') sharedUrlToCreate: SharedUrlToCreate): Promise<SharedUrl | Message> {
        try {
            const { title, authorId, endAt } = sharedUrlToCreate;
            const author = await new UserService().getUserById(authorId);

            if (!author) {
                return { success: false, message: 'Author not found' };
            }
            const sharedUrl = await new SharedUrlService().createSharedUrl({
                title,
                author,
                endAt,
            });
            return sharedUrl;
        } catch (error) {
            console.error('Erreur dans CreateSharedUrl:', error);
            throw new Error("Erreur lors de la création de l'URL de partage.");
        }
    }

    @Mutation(() => UnionMessageSharedUrl)
    async UpdateSharedUrl(@Arg('id') id: string, @Arg('sharedUrlToUpdate') sharedUrlToUpdate: SharedUrlToUpdate): Promise<SharedUrl | Message> {
        try {
            const { title, endAt, filesToAdd, filesToRemove } = sharedUrlToUpdate;
            if (title || endAt)
                await new SharedUrlService().updateSharedUrl(id, {
                    title,
                    endAt,
                });

            if (filesToAdd) {
                await new SharedUrlService().associateFilesToSharedUrl(filesToAdd, id);
            }

            if (filesToRemove) {
                await new SharedUrlService().removeFilesFromSharedUrl(filesToRemove, id);
            }
            const updatedSharedUrl = await new SharedUrlService().getSharedUrlById(id);

            return updatedSharedUrl ?? { success: false, message: 'SharedUrl not found' };
        } catch (error) {
            console.error('Erreur dans UpdateSharedUrl:', error);
            throw new Error("Erreur lors de la mise à jour de l'URL de partage.");
        }
    }

    @Mutation(() => UnionMessageSharedUrl)
    async CreateSharedUrlWithFilesAndUsers(
        @Arg('sharedUrlToCreateWithFilesAndUsers')
        sharedUrlToCreateWithFilesAndUsers: sharedUrlToCreateWithFilesAndUsers
    ) {
        try {
            const { title, authorId, endAt, filesIds, emails } = sharedUrlToCreateWithFilesAndUsers;
            const author = await new UserService().getUserById(authorId);

            if (!author) {
                return { success: false, message: 'Author not found' };
            }
            const newSharedUrl = await new SharedUrlService().createSharedUrl({
                title,
                author,
                endAt,
            });
            if (!newSharedUrl) {
                return {
                    success: false,
                    message: 'Something went wrong while creating sharedUrl',
                };
            }
            if (filesIds && newSharedUrl instanceof SharedUrl) {
                await new SharedUrlService().associateFilesToSharedUrl(filesIds, newSharedUrl.id);
            }
            if (emails && newSharedUrl instanceof SharedUrl) {
                await new SharedUrlService().associateUserSharedUrlsToSharedUrl(emails, newSharedUrl);
            }
            if (newSharedUrl instanceof SharedUrl) return await new SharedUrlService().getSharedUrlById(newSharedUrl.id);
            return {
                success: false,
                message: 'Something went wrong while creating sharedUrl',
            };
        } catch (error) {}
    }

    @Mutation(() => Boolean)
    async DeleteSharedUrl(@Arg('id') id: string): Promise<boolean> {
        try {
            await new SharedUrlService().deleteSharedUrl(id);
            return true;
        } catch (error) {
            console.error('Erreur dans DeleteSharedUrl:', error);
            throw new Error("Erreur lors de la suppression de l'URL de partage.");
        }
    }
}
