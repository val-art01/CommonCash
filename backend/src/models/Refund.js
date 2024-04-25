import mongoose from 'mongoose';

const RefundSchema  = new mongoose.Schema(
    {
        groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true },
        debtorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
        creditorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
        amount: { type: Number, default: 0 }
        // reason: { type: String },
        // status: { type: String, enum: ['en attente', 'effectué', 'annulé'], default: 'en attente' },
    },
    { timestamps: true }
)

export default mongoose.model('Refund', RefundSchema)