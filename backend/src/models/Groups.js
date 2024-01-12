import mongoose from 'mongoose';

const GroupSchema = new mongoose.Schema(
    {       
        name: { type: String, required: true },
        description: { type: String },
        membres: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }],
        directors : { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    },
    { timestamps: true }
)

export default mongoose.model( 'Group', GroupSchema)