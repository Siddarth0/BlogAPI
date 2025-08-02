import Blog from "../models/Blog.js"
import asyncHandler from "../../utils/asyncHandler.js"


export const createBlog = asyncHandler(async (req, res) => {
  const { title, description, tags } = req.body;
  if (!title || !description) throw new Error('Title and description are required');

  const blog = await Blog.create({ title, description, tags, author: req.user.id });
  res.status(201).json(blog);
});


export const getBlogs = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  let filter = {};
  if (req.query.search) filter.$text = { $search: req.query.search };
  if (req.query.tag) filter.tags = req.query.tag;
  
  const blogs = await Blog.find(filter)
    .skip(skip)
    .limit(limit)
    .sort(sort === 'asc' ? 'createdAt' : '-createdAt');

  const total = await Blog.countDocuments(filter);

  res.json({ total, page, pages: Math.ceil(total / limit), blogs });
});


export const getBlogById = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) return res.status(404).json({ message: "Blog not found" });
  res.json(blog);
});


export const updateBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) return res.status(404).json({ message: "Blog not found" });
  if (blog.author.toString() !== req.user.id)
    return res.status(403).json({ message: "Not authorized" });

  Object.assign(blog, req.body);
  await blog.save();
  res.json(blog);
});


export const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) return res.status(404).json({ message: "Blog not found" });
  if (blog.author.toString() !== req.user.id)
    return res.status(403).json({ message: "Not authorized" });

  await blog.deleteOne();
  res.json({ message: "Blog deleted" });
});


export const addComment = asyncHandler(async (req, res) => {
  const { text } = req.body;
  const blog = await Blog.findById(req.params.id);
  if (!blog) return res.status(404).json({ message: "Blog not found" });

  blog.comments.push({ user: req.user.id, text });
  await blog.save();
  res.status(201).json(blog);
});