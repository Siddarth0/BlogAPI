import express from 'express';
import { createBlog, getBlogs, getBlogById, updateBlog, deleteBlog, addComment } from '../controllers/blogController.js';
import { protect } from '../middleware/authmiddleware.js';

const router = express.Router();

router.get('/', getBlogs);
router.get('/:id', getBlogById);
router.post('/', protect, createBlog);
router.put('/:id', protect, updateBlog);
router.delete('/:id', protect, deleteBlog);
router.post('/:id/comment', protect, addComment);

export default router;