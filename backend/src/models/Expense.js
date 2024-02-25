import mongoose from 'mongoose';

const expenseSchema   = new mongoose.Schema(
    {
        groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true },
        authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
        amount: { type: Number, required: true },
        description: { type: String, trim: true },
        receipts: [{ type: String }]
    },
    { timestamps: true }
)

export default mongoose.model('Expense', expenseSchema)