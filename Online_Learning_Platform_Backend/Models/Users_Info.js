const mongoose = require("mongoose");
const users_Info_Schema = new mongoose.Schema({
        name: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true,
            unique: true
        },
        phone_Number: {
            type: String,
            required: true,            
        },

        password: {
            type: String,
            required: true
        },

        role: {
            type: String,
            enum: ["student", "instructor"],
            required: true
        },
        otp: {
            type: String,
            required: true
        },otpExpires: {
            type: Number,
            required: true
        },


    },
    { timestamps: true }
);
const  Users_Info_Model= mongoose.model("Users_Info", users_Info_Schema);
module.exports=Users_Info_Model;
