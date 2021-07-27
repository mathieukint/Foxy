const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    pseudo: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 20,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 20,
        validate: [isEmail],
        lowerCase: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        maxLength: 1024
    },
    picture: {
        type: String,
        default: "./uploads/profile/random-user.png"
    },
    bio: {
        type: String,
        maxLength: 1024
    },
    followers: {
        type: [String]
    },
    followings: {
        type: [String]
    },
    likes: {
        type: [String]
    }
}, {
    timestamps: true,
})

userSchema.pre("save", async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;