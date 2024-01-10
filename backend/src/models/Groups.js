import mongoose from 'mongoose';

const GroupSchema = new mongoose.Schema(
    {
        Id: {type: String, unique: true},
        name: {type: String, required: true},
        membersId: {type: Array, required: true},
        //Dépenses
        //soldes
    },
    { timestamps: true }
)

export default mongoose.model( 'Group', GroupSchema)