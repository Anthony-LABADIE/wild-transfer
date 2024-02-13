import multer from 'multer';
import path from 'path';

// Configuration du dossier de destination pour les uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../uploads/profileUploads/'));
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

export const profileMiddleware = multer({
    storage: storage,
    // limits: {
    //     fileSize: 10 * 1024 * 1024,
    // },
    fileFilter: (req, file, cb) => {
        console.log(req);
        console.log(file);
        if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
            cb(null, true);
        } else {
            cb(new Error('Only PNG and JPEG files are allowed'));
        }
    },
}).single('avatar');
