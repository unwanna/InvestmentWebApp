const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        id: Schema.Types.ObjectId,
        favorites: [String],
        username: String,
        password: String,
}
);



module.exports = mongoose.model("User", UserSchema);