import mongoose from 'mongoose';

const expenseSchema   = new mongoose.Schema(
    {
        title: {type: String, require: true, trim: true},
        amount: { type: Number, required: true },
        description: { type: String},
        receipts: [{ type: String, required: true }],
        category: {
            type: String,
            enum: ['alimentation', 'frais de déplacement', 'activité', 'autre'],
            required: true
        },
        paidBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true },
        membersInvolved: [{
            member: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
            weight: { type: Number, default: 1 }
        }],
        date: {type: Date, default: Date.now}        
    },
    { timestamps: true }
)

export default mongoose.model('Expense', expenseSchema)