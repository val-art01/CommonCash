import mongoose from 'mongoose';

const GroupSchema = new mongoose.Schema(
    {       
        name: { type: String, required: true, trim: true },
        description: { type: String, trim: true },
        members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }],
        admins : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true }],
    },
    { timestamps: true }
)

export default mongoose.model( 'Group', GroupSchema)