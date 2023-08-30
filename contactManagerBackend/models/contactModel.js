const mongoose = require('mongoose');

const contactSchema = mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "userModel"
        },
        
        name: {
            type: String,
            required: true
        },
        
        contactNumber: {
            type: String,
            required: true
        }
    },

    {
        timestamps: true
    }
)


module.exports = mongoose.model("contactModel", contactSchema)