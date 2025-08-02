import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    user: { type: String, required: true},
    text: { type: String, required: true},
    createdAt: { type: Date, default: Date.now},
});

const blogSchema = new mongoose.Schema({
    title: {type:String, required:true},
    description: {type: String, required:true},
    tags: [String],
    comments: [commentSchema],
    createdAt: { type: Date, default: Date.now}
});

export default mongoose.model('Blog', blogSchema);