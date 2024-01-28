import mongoose from 'mongoose';

const GroupSchema = new mongoose.Schema(
    {       
        name: { type: String, required: true },
        description: { type: String },
        members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }],
        admins : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true }],
    },
    { timestamps: true }
)

export default mongoose.model( 'groups', GroupSchema)