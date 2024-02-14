import 'reflect-metadata';
import * as dotenv from 'dotenv';
import { buildSchema } from 'type-graphql';
import express from 'express';
import http from 'http';
import cors from 'cors';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { ApolloServer } from '@apollo/server';
import dataSource from './lib/dataSource';
import { UserResolver } from './resolvers/user.resolver';
import { FileResolver } from './resolvers/file.resolver';
import { CommentResolver } from './resolvers/comment.resolver';
import { SharedUrlResolver } from './resolvers/sharedUrl.resolver';
import { InteractionResolver } from './resolvers/interaction.resolver';
import uploadRoutes from './routes/uploadRoutes';

dotenv.config();

interface MyContext {}
import { UserSharedUrlResolver } from './resolvers/userSharedUrl.resolver';
import { EmojiResolver } from './resolvers/emoji.resolver';

const app = express();
const PORT = process.env.PORT || 4000;
app.use(
    cors({
        origin: '*',
    })
);
app.use('/uploads', uploadRoutes);
const httpServer = http.createServer(app);
export const db = dataSource.getRepository('File');
export const dbUser = dataSource.getRepository('User');

async function main() {
    const schema = await buildSchema({
        resolvers: [UserResolver, FileResolver, CommentResolver, SharedUrlResolver, InteractionResolver, UserSharedUrlResolver, EmojiResolver],
        validate: false,
    });
    const server = new ApolloServer<MyContext>({
        schema,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });

    await server.start();

    app.use(
        '/',
        cors<cors.CorsRequest>({ origin: '*' }),
        express.json(),
        expressMiddleware(server, {
            apolloServer: {
                disableHealthCheck: true,
            },
        } as any)
    );

    await dataSource.initialize();
    await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
    console.log(`🚀 Server lancé sur http://localhost:${PORT}/`);
}

main();
