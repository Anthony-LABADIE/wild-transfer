import cors from 'cors';
import multer from 'multer';
import path from 'path';
import express from 'express';

const app = express();

// Configuration des CORS
app.use(cors());

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, path.join(__dirname, '../../uploads/tempUploads/'));
    },
    filename: (_, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024,
    },
    fileFilter: (_, file, cb) => {
        if (file.mimetype === 'image/png' || file.mimetype === 'application/pdf' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
            cb(null, true);
        } else {
            cb(new Error('Only PNG and PDF files are allowed'));
        }
    },
});

export const uploadMiddleware = upload.array('files', 5);
