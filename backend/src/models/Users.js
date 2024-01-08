import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
    {
        accountId: {type: String, unique: true},
        name: {type: String, required: true},
        email: {type: String, required: true, unique: true, lowerCase: true, trim: true},
        password: {type: String},
        provider: {type: String, default: "standard"},
        iv: { type: String, required: true},
        authTokens: [{
            authToken:{ type: String, required: true}
        }]
    },
    { timestamps: true }
)

export default mongoose.model('Users', UserSchema)