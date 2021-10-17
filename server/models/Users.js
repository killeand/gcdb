const Mongoose = require("mongoose");

var UsersSchema = new Mongoose.Schema({
    DisplayName: String,
    Email: String,
    Password: String,
    Salt: String,
    Friends: [String]
});

var Users = Mongoose.model("Users", UsersSchema, "Users");

module.exports = Users;