import { DeleteResult, Repository } from 'typeorm';
import dataSource from '../lib/dataSource';
import { ICommentToCreateService, Message } from './service';
import { Comment } from '../entities/Comment.entity';

export default class CommentService {
    db: Repository<Comment>;
    constructor() {
        this.db = dataSource.getRepository('Comment');
    }

    async getAllComments(): Promise<Comment[]> {
        return await this.db
            .createQueryBuilder('comment')
            .leftJoinAndSelect('comment.author', 'author')
            .leftJoinAndSelect('comment.file', 'file')
            .leftJoinAndSelect('comment.sharedUrl', 'sharedUrl')
            .leftJoinAndSelect('comment.interactions', 'interactions')
            .getMany();
    }

    async getCommentById(id: string): Promise<Comment | undefined> {
        const comment = await this.db
            .createQueryBuilder('comment')
            .leftJoinAndSelect('comment.author', 'author')
            .leftJoinAndSelect('comment.interactions', 'interactions')
            .leftJoinAndSelect('comment.file', 'file')
            .where('comment.id = :id', { id })
            .getOne();
        return comment ?? undefined;
    }

    async createComment({ content, author, file, sharedUrl }: ICommentToCreateService): Promise<Comment | Message> {
        try {
            const newComment: Comment = this.db.create({
                content,
                author,
                file,
                sharedUrl,
            });
            return await this.db.save(newComment);
        } catch (error) {
            console.log(error);
            return { success: false, message: 'something went wrong' };
        }
    }

    async updateComment({ id, content }: { id: string } & Partial<ICommentToCreateService>): Promise<Message> {
        try {
            const result = await this.db.update(id, { content });
            if (result.affected === 1) {
                return { success: true, message: 'Comment succesfully updated' };
            }
            return { success: false, message: 'Comment not found' };
        } catch (error) {
            console.log(error);
            return { success: false, message: 'something went wrong' };
        }
    }

    async deleteComment(id: string): Promise<Message> {
        const result: DeleteResult = await this.db.delete(id);
        if (result.affected === 1) {
            return { success: true, message: 'Comment succesfully deleted' };
        }
        return { success: false, message: 'Comment not found' };
    }
}
