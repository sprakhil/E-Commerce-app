import express from 'express';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.post('/', upload.single('image'), (req, res) => {
  res.send({
    message: 'Image Uploaded',
    image: `/${req.file.path.replace(/\\/g, "/")}`, // Standardize path separators
  });
});

export default router;