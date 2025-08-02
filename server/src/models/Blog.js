import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    user: { type: String, required: true},
    text: { type: String, required: true},
    createdAt: { type: Date, default: Date.now},
});

const blogSchema = new mongoose.Schema({
    title: {type:String, required:true, trim:true},
    description: {type: String, required:true},
    tags: [{type:String, index: true}],
    comments: [commentSchema],
    author: {type: mongoose.Schema.Types.ObjectId, ref: "User", required:true},
}, { timestamps: true });

blogSchema.index({ title: 'text', description: 'text'});

export default mongoose.model('Blog', blogSchema);