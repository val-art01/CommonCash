import mongoose from 'mongoose';

const postSchema  = new mongoose.Schema(
    {
        groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true },
        authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
        contenu: { type: String, required: true },
    },
    { timestamps: true }
)

export default mongoose.model('Post', postSchema)