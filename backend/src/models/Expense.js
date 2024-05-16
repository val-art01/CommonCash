import mongoose from 'mongoose';

const expenseSchema   = new mongoose.Schema(
    {
        title: {type: String, required: true, trim: true},
        amount: { type: Number, required: true },
        // receipts: [{ type: String, required: true }],
        category: { type: String, required: true },
        payingMember: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true },
        membersInvolveds: [{
            member: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
            ponderation: { type: Number, default: 1 }
        }],
        date: {type: Date, default: Date.now}        
    },
    { timestamps: true }
)

export default mongoose.model('Expense', expenseSchema)