import mongoose from 'mongoose';

const depenseSchema   = new mongoose.Schema(
    {
        groupeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true },
        authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
        amount: { type: Number, required: true },
        description: { type: String },
    },
    { timestamps: true }
)

export default mongoose.model('Depense', depenseSchema)