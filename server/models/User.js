const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true},
    password: { type: String, required: true },
    profileImage: {
        type: String,
        default: 'default-profile-image.jpg',
    }
    // accountBalance: { type: Number, default: 20000 },
});

const User = mongoose.model("User", userSchema);

module.exports = User;