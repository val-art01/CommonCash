import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        email: {type: String, required: true, unique: true, lowerCase: true, trim: true},
        password: {type: String, required: true},
        iv: { type: String, required: true },
        authTokens: [{
            authToken:{ type: String, required: true}
        }]
    },
    { timestamps: true }
)

export default mongoose.model('Users', UserSchema)