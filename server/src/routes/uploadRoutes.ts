import express from 'express';
import path from 'path';
import { uploadMiddleware } from '../middleware/uploadMiddleware';
import { profileMiddleware } from '../middleware/profileMiddleware';
import { db, dbUser } from '../index';
import ffmpeg from 'fluent-ffmpeg';

const router = express.Router();

router.post('/files', uploadMiddleware, async (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).send('No file was provided.');
    }

    const fileDataArray: any[] = [];
    const filesLength = req.files.length as number;
    const files: Record<number | string, Express.Multer.File> = req.files as any;
    req.headers['Content-Type'] = 'application/json';

    // Loop through the files and process them
    for (let i = 0; i < filesLength; i++) {
        const file = files[i];
        const filePath = file.path;
        const fileName = file.filename;

        try {
            await new Promise((resolve) => {
                // Verifying if the file is a PDF or another type of file
                if (
                    file.mimetype === 'application/pdf' ||
                    file.mimetype === 'application/x-pdf' ||
                    file.mimetype === 'application/msword' ||
                    file.mimetype === 'application/vnd.ms-excel' ||
                    file.mimetype === 'text/pdf' ||
                    file.mimetype === 'application/vnd.ms-powerpoint' ||
                    file.mimetype === 'text/csv' ||
                    file.mimetype === 'application/json'
                ) {
                    const duration = '0';
                    const format = 'pdf';

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
                } else {
                    // If the file is not a PDF, use ffprobe to get the duration and format
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
                }
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
router.get('/download/:id', async (req, res) => {
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

// Route POST pour téléverser une image de profil
router.post('/profile', profileMiddleware, async (req, res) => {
    if (!req.file) {
        return res.status(400).send("Aucun fichier n'a été fourni.");
    }
    console.log(req);
    // Logique de traitement de l'image (par exemple, enregistrement dans la base de données, etc.)
    console.log('Fichier téléversé avec succès:', req.file);

    return res.status(200).send('Fichier téléversé avec succès.');
});

router.get('/profile/:id', async (req, res) => {
    try {
        const user = await dbUser.findOne({
            where: { id: req.params.id },
        });

        if (!user) {
            return res.status(404).send('File not found');
        }

        const filePath = path.join(user.imgUrl);

        res.sendFile(filePath);
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
});

export default router;
