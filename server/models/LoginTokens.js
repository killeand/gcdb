import Mongoose from 'mongoose';

const LoginTokensSchema = new Mongoose.Schema({
    Token: String,
    ID: String,
    IP: String,
    Generated: Date,
    ExpiresAt: {
        type: Date,
        expires: 120, //(60 * 60 * 24),
        default: Date.now
    }
});

const LoginTokens = Mongoose.model("LoginTokens", LoginTokensSchema, "LoginTokens");

export default LoginTokens;