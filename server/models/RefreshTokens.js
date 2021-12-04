import Mongoose from 'mongoose';

const RefreshTokensSchema = new Mongoose.Schema({
    Token: String,
    ID: String,
    IP: String,
    Generated: Date,
    ExpiresAt: {
        type: Date,
        expires: (30 * 24 * 60 * 60)
    }
});

export default Mongoose.model("RefreshTokens", RefreshTokensSchema, "RefreshTokens");