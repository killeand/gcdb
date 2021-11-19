import Mongoose from 'mongoose';

let UsersSchema = new Mongoose.Schema({
    DisplayName: String,
    Email: String,
    Password: String,
    Salt: String,
    Friends: [String],
    Perms: Number
});

export default Mongoose.model("Users", UsersSchema, "Users");