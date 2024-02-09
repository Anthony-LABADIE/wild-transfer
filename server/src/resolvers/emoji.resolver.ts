import { Arg, Mutation, Query, Resolver, createUnionType } from 'type-graphql';
import { Emoji, EmojiToCreate } from '../entities/Emoji.entity';
import EmojiService from '../services/Emoji.service';
import { MessageGql } from './common.types';
import { Message } from '../services/service';

const UnionMessageEmoji = createUnionType({
    name: 'UnionMessageEmoji',
    types: () => [Emoji, MessageGql] as const,
    resolveType: (value) => {
        return (value as Emoji).id !== undefined ? Emoji : MessageGql;
    },
});

@Resolver()
export class EmojiResolver {
    @Query(() => [Emoji])
    async EmojiList(): Promise<Emoji[]> {
        const emojis = await new EmojiService().getAllEmojis();
        const neutralEmoji = emojis.find((emoji) => emoji.iconName === 'FaceSmileIcon');
        const sortedEmojis = neutralEmoji ? [neutralEmoji].concat(emojis.filter((emoji) => emoji.id !== neutralEmoji.id)) : emojis;
        return sortedEmojis;
    }

    @Query(() => Emoji)
    async Emoji(@Arg('id') id: string): Promise<Emoji | undefined> {
        const emoji = await new EmojiService().getEmojiById(id);
        return emoji ?? undefined;
    }

    @Mutation(() => UnionMessageEmoji)
    async createEmoji(@Arg('emoji') emoji: EmojiToCreate): Promise<Emoji | Message> {
        return await new EmojiService().createEmoji(emoji);
    }

    @Mutation(() => UnionMessageEmoji)
    async deleteEmoji(@Arg('id') id: string): Promise<Emoji | Message> {
        return await new EmojiService().deleteEmoji(id);
    }
}
