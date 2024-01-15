import mongoose from 'mongoose';

const invitationSchema  = new mongoose.Schema(
    {
        groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true },
        senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
        recipient: { type: String, required: true },
        status: { type: String, enum: ['en attente', 'acceptée', 'refusée'], default: 'en attente' },
    },
    { timestamps: true }
)

export default mongoose.model('Invitation', invitationSchema)