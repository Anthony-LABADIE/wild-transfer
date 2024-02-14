import cors from 'cors';
import multer from 'multer';
import path from 'path';
import express from 'express';

const app = express();

// Configuration des CORS
app.use(cors());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../uploads/tempUploads/'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/png' || file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Only PNG and PDF files are allowed'));
        }
    },
});

export const uploadMiddleware = upload.array('files', 5);
