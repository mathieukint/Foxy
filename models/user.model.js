const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    pseudo: {
        type: String,
        required: true,
        minlength: 3,
        maxLength: 20,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        minlength: 3,
        maxLength: 50,
        validate: [isEmail],
        lowercase: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
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

userSchema.statics.login = async function(pseudo, password) {
    const user = await this.findOne({pseudo});
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error('mot de passe incorrect');
    }
    throw Error('pseudo incorrect');
}

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;