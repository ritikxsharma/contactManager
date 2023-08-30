const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Please provide username.!!"]
        },

        email: {
            type: String,
            required: [true, "Please provide email address.!!"],
            unique: [true, "This email address is already in use..!!"]
        },

        password: {
            type: String,
            required: [true, "Please provide password.!!"]
        }
    },

    {
        timestamps: true
    }
)


module.exports = mongoose.model("userModel", userSchema)