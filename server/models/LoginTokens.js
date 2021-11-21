import Mongoose from 'mongoose';

const LoginTokensSchema = new Mongoose.Schema({
    Token: String,
    ID: String,
    IP: String,
    Generated: Date,
    ExpiresAt: {
        type: Date,
        expires: (24 * 60 * 60),
        default: Date.now() + (24 * 60 * 60 * 1000)
    }
});

const LoginTokens = Mongoose.model("LoginTokens", LoginTokensSchema, "LoginTokens");

export default LoginTokens;