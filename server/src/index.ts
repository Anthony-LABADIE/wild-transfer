import 'reflect-metadata';
import * as dotenv from 'dotenv';
import { buildSchema } from 'type-graphql';
import path from 'path';
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
import { uploadMiddleware } from './middleware/uploadMiddleware';
import ffmpeg from 'fluent-ffmpeg';

dotenv.config();

interface MyContext {}
import { UserSharedUrlResolver } from './resolvers/userSharedUrl.resolver';
import { EmojiResolver } from './resolvers/emoji.resolver';

const app = express();
const PORT = process.env.PORT || 4000;
app.use(cors());

app.post('/uploads/files', cors(), uploadMiddleware, async (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).send("Aucun fichier n'a été fourni.");
    }

    const fileDataArray: any[] = [];
    const filesLength = req.files.length as number;
    const files: Record<number | string, Express.Multer.File> = req.files as any;

    // Utilisez une boucle pour traiter chaque fichier
    for (let i = 0; i < filesLength; i++) {
        const file = files[i];
        const filePath = file.path;
        const fileName = file.filename;

        try {
            await new Promise((resolve, reject) => {
                ffmpeg.ffprobe(filePath, async (err, metadata) => {
                    if (err) {
                        console.error('Erreur avec ffprobe:', err);
                        return res.status(500).send('Erreur lors de la récupération des métadonnées du fichier.');
                    }

                    const duration = metadata.format.duration ? metadata.format.duration.toString() : '0';
                    const format = metadata.format.format_name || 'inconnu';

                    const fileData = {
                        title: req.body.title[i],
                        description: req.body.description[i],
                        isPublic: req.body.isPublic[i],
                        authorUsername: req.body.author[i],
                        url: fileName,
                        duration,
                        format,
                    };

                    fileDataArray.push(fileData);
                    resolve(null);
                });
            });
        } catch (ffmpegError) {
            console.error('Erreur avec ffmpeg:', ffmpegError);
            return res.status(500).send('Erreur lors du traitement du fichier avec ffmpeg.');
        }
    }

    try {
        return res.json(fileDataArray);
    } catch (error) {
        console.error("Erreur lors de l'enregistrement des fichiers en base de données:", error);
        return res.status(500).send("Erreur lors de l'enregistrement des fichiers en base de données.");
    }
});

app.get('/download/:id', cors(), async (req, res) => {
    try {
        const file = await db.findOne({
            where: { id: req.params.id },
        });

        if (!file) {
            return res.status(404).send('File not found');
        }

        const filePath = path.join(file.url);

        res.download(filePath, file.title);
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
});

const httpServer = http.createServer(app);
const db = dataSource.getRepository('File');

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
            // context: async ({
            //   req,
            // }: {
            //   req: express.Request;
            // }): Promise<{ user: User | null }> => {
            //   let user = null;
            //   const payload = (await new UserService().getAndCheckToken(
            //     req.headers.authorization
            //   )) as UserWithToken;
            //   if (payload) {
            //     user = await new UserService().getUserByEmail(payload.user.email);
            //   }
            //   return { user };
            // },
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
