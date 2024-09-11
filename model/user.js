const { Schema, model } = require('mongoose');
const { createHmac, randomBytes, createHash } = require("crypto");
const { createTokenForUser } = require('../services/authentication');

const userSchema = new Schema({

    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    salt: {
        type: String,
    
    },
    password: {
        type: String,
        required: true,

    },
    profileImageURL: {
        type: String,
        default: "/images/person.png"
    },
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER",
    }

},
    {
        timestamps: true,
    }
);

userSchema.pre("save", function (next) {
    const user = this;

    if (!user.isModified("password")) return;

    const salt = randomBytes(16).toString;
    const hashedPassword = createHmac("sha256", salt).update(user.password).digest("hex");

    this.salt = salt;
    this.password = hashedPassword;

    next();
});

<<<<<<< HEAD
userSchema.static("matchPasswordAndGenerateToken", async function(email,password){
=======
userSchema.static("matchPassword", async function(email,password){
>>>>>>> 68561d0066d974ec3db7cee8475ce28c4c2cabf0
    const user = await this.findOne({email});

    if(!user) throw new Error('User not found!');

    const salt = user.salt;
    const hashedPassword = user.password;

    const userProvidedHash = createHmac("sha256", salt).update(password).digest("hex");

    if(hashedPassword !== userProvidedHash) throw new Error('Incorrect Password')
<<<<<<< HEAD
        
        const token = createTokenForUser(user);
    return token;
=======

    return user;
>>>>>>> 68561d0066d974ec3db7cee8475ce28c4c2cabf0
})

const User = model('user', userSchema);

module.exports = User;