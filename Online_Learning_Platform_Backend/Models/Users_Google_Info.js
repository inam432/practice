const mongoose = require("mongoose");
const users_Google_Info_Schema = new mongoose.Schema({
    sub: {
  type: String,
  required: true,
  unique: true
},
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
        role: {
            type: String,
            enum: ["student", "instructor"],
            required: true
        }
    },
    { timestamps: true }
);
const  Users_Google_Info_Model= mongoose.model("Users_Google_Info",users_Google_Info_Schema);
module.exports=Users_Google_Info_Model;
